import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, FlipHorizontal, X, Check, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileCameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  onCancel: () => void;
}

export function ProfileCameraCapture({ onCapture, onCancel }: ProfileCameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  const isFrontCamera = facingMode === 'user';

  // Apply stable video sizing after stream loads — same pattern as RecordInterface
  const applyVideoStyles = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.style.position = 'absolute';
    v.style.top = '0';
    v.style.left = '0';
    v.style.width = '100%';
    v.style.height = '100%';
    v.style.objectFit = 'cover';
    v.style.objectPosition = 'center center';
    // No transform on the video element — mirroring is on the wrapper div
    v.style.transform = 'none';
  }, []);

  const startCamera = useCallback(async () => {
    // Stop any existing stream first
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
    setCameraError(null);

    try {
      // Attempt 1: with facingMode
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 720 }, height: { ideal: 720 } }
        });
      } catch {
        // Attempt 2: no facingMode constraint (Windows / some Android)
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 720 }, height: { ideal: 720 } }
        });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch {
          // autoplay policy — playsInline + muted should cover it
        }
        applyVideoStyles();
      }
    } catch (error: any) {
      const isDenied =
        error?.name === 'NotAllowedError' ||
        error?.name === 'PermissionDeniedError' ||
        error?.message?.includes('Permission denied');
      console.log(isDenied ? '📷 Camera permission denied' : '❌ Camera error:', error);
      setCameraError('Unable to access camera. Please check permissions.');
      if (!isDenied) toast.error('Camera error — please try again');
    }
  }, [facingMode, applyVideoStyles]);

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, [startCamera]);

  // Re-apply styles whenever facingMode changes (mirror toggle)
  useEffect(() => {
    applyVideoStyles();
  }, [applyVideoStyles]);

  const handleLoadedMetadata = () => {
    applyVideoStyles();
    setCameraReady(true);
  };

  const handleFlipCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Center-crop to square
    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;

    if (isFrontCamera) {
      // Un-mirror: flip canvas horizontally so saved image is not backwards
      ctx.translate(size, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
    setCapturedImage(canvas.toDataURL('image/jpeg', 0.92));
  };

  const handleConfirm = () => {
    if (capturedImage) {
      streamRef.current?.getTracks().forEach(t => t.stop());
      onCapture(capturedImage);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleCancel = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    onCancel();
  };

  if (cameraError) {
    return (
      <div className="text-center py-12">
        <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600 dark:text-slate-400 mb-4">{cameraError}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={startCamera}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Camera Preview */}
      <div
        className="relative bg-black rounded-xl overflow-hidden"
        style={{ aspectRatio: '1 / 1' }}
      >
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <>
            {/* Mirror wrapper — transform on a div, NOT on the video element,
                so object-fit: cover stays correctly anchored */}
            <div style={{
              position: 'absolute', inset: 0,
              transform: isFrontCamera ? 'scaleX(-1)' : 'none',
              transformOrigin: 'center center',
            }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                onLoadedMetadata={handleLoadedMetadata}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  display: 'block',
                }}
              />
            </div>

            {/* Vignette cutout overlay — radial-gradient creates transparent circle in center */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, transparent 36%, rgba(0,0,0,0.55) 38%)',
              }}
            />

            {/* Circle guide ring */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="rounded-full border-2 border-white/60"
                style={{ width: '74%', height: '74%' }}
              />
            </div>

            {/* Flip camera button */}
            <button
              onClick={handleFlipCamera}
              className="absolute top-3 right-3 p-2.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Flip camera"
            >
              <FlipHorizontal className="w-5 h-5 text-white" />
            </button>

            {/* Loading indicator */}
            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Action Buttons */}
      <div className="flex gap-3">
        {capturedImage ? (
          <>
            <button
              onClick={handleRetake}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-colors font-medium"
            >
              <X className="w-4 h-4" />
              Retake
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors font-medium"
            >
              <Check className="w-4 h-4" />
              Use Photo
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleCapture}
              disabled={!cameraReady}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium"
            >
              <Camera className="w-4 h-4" />
              Capture
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-center text-slate-500 dark:text-slate-400">
        Center your face in the circle
      </p>
    </div>
  );
}
