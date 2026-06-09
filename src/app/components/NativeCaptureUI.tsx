import React, { useRef, useEffect } from 'react';
import { Camera, Video, Mic } from 'lucide-react';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

type RecordingMode = 'photo' | 'video' | 'audio';

interface MediaItem {
  id: string;
  type: RecordingMode;
  url: string;
  blob: Blob;
  timestamp: number;
  thumbnail?: string;
  filename?: string;
}

interface NativeCaptureUIProps {
  onMediaCaptured: (item: MediaItem) => void;
}

async function generateVideoThumbnail(file: File): Promise<string | undefined> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = url;
    video.playsInline = true;
    video.muted = true;
    video.currentTime = 0.5;

    const cleanup = () => URL.revokeObjectURL(url);

    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 240;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        } else {
          resolve(undefined);
        }
      } catch {
        resolve(undefined);
      } finally {
        cleanup();
      }
    });

    video.addEventListener('error', () => { cleanup(); resolve(undefined); });

    // Fallback timeout
    setTimeout(() => { cleanup(); resolve(undefined); }, 5000);
  });
}

export function NativeCaptureUI({ onMediaCaptured }: NativeCaptureUIProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  const processFile = async (file: File, type: RecordingMode) => {
    if (file.size > MAX_FILE_SIZE) {
      alert(`File is too large. Maximum size is 500MB.`);
      return;
    }

    // Revoke previous blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    blobUrlRef.current = url;

    // Normalize audio MIME type
    let blob: Blob = file;
    if (type === 'audio' && !file.type.startsWith('audio/')) {
      blob = new Blob([file], { type: 'audio/mp4' });
    }

    let thumbnail: string | undefined;
    if (type === 'video') {
      thumbnail = await generateVideoThumbnail(file);
    } else if (type === 'photo') {
      thumbnail = url;
    }

    const item: MediaItem = {
      id: `native_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      type,
      url,
      blob,
      timestamp: Date.now(),
      thumbnail,
      filename: file.name || `capture_${Date.now()}`,
    };

    onMediaCaptured(item);
  };

  const handleFileChange = (type: RecordingMode) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file, type);
      // Reset input so same file can be re-selected after retake
      e.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-8 px-6">
      {/* Hidden file inputs */}
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange('photo')}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange('video')}
      />
      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        capture="microphone"
        className="hidden"
        onChange={handleFileChange('audio')}
      />

      {/* Header */}
      <div className="text-center">
        <h2 className="text-white text-2xl font-bold tracking-tight">Capture Media</h2>
        <p className="text-white/50 text-sm mt-1">Choose what you'd like to capture</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => photoInputRef.current?.click()}
          className="flex items-center gap-4 w-full px-6 py-5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors border border-white/15"
        >
          <div className="p-3 rounded-xl bg-blue-500/20">
            <Camera className="w-6 h-6 text-blue-300" />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base">Take Photo</div>
            <div className="text-white/50 text-xs mt-0.5">Opens your camera</div>
          </div>
        </button>

        <button
          onClick={() => videoInputRef.current?.click()}
          className="flex items-center gap-4 w-full px-6 py-5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors border border-white/15"
        >
          <div className="p-3 rounded-xl bg-red-500/20">
            <Video className="w-6 h-6 text-red-300" />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base">Record Video</div>
            <div className="text-white/50 text-xs mt-0.5">Opens your camera</div>
          </div>
        </button>

        <button
          onClick={() => audioInputRef.current?.click()}
          className="flex items-center gap-4 w-full px-6 py-5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors border border-white/15"
        >
          <div className="p-3 rounded-xl bg-purple-500/20">
            <Mic className="w-6 h-6 text-purple-300" />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base">Record Audio</div>
            <div className="text-white/50 text-xs mt-0.5">Opens your microphone</div>
          </div>
        </button>
      </div>
    </div>
  );
}
