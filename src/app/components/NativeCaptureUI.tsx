import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, Video, Mic, Square, Check, X } from 'lucide-react';

const MAX_FILE_SIZE = 500 * 1024 * 1024;

type RecordingMode = 'photo' | 'video' | 'audio';
type AudioState = 'idle' | 'recording' | 'paused' | 'preview';

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
  onClose?: () => void;
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
        } else { resolve(undefined); }
      } catch { resolve(undefined); }
      finally { cleanup(); }
    });
    video.addEventListener('error', () => { cleanup(); resolve(undefined); });
    setTimeout(() => { cleanup(); resolve(undefined); }, 5000);
  });
}

export function NativeCaptureUI({ onMediaCaptured, onClose }: NativeCaptureUIProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const [audioState, setAudioState] = useState<AudioState>('idle');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      stopStream();
    };
  }, []);

  const stopStream = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#a855f7';
      ctx.beginPath();
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    draw();
  }, []);

  const startAudioRecording = async () => {
    setAudioError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      streamRef.current = stream;

      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setPreviewBlob(blob);
        setAudioState('preview');
        stopStream();
      };

      recorder.start(100);
      setAudioState('recording');
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => setRecordingSeconds(s => s + 1), 1000);
      drawWaveform();
    } catch {
      setAudioError('Microphone access denied. Please allow microphone access and try again.');
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  };

  const confirmAudio = () => {
    if (!previewBlob || !previewUrl) return;
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    blobUrlRef.current = previewUrl;
    const item: MediaItem = {
      id: `native_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      type: 'audio',
      url: previewUrl,
      blob: previewBlob,
      timestamp: Date.now(),
      filename: `audio_${Date.now()}.webm`,
    };
    onMediaCaptured(item);
  };

  const discardAudio = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewBlob(null);
    setAudioState('idle');
    setRecordingSeconds(0);
  };

  const processFile = async (file: File, type: RecordingMode) => {
    if (file.size > MAX_FILE_SIZE) { alert('File is too large. Maximum size is 500MB.'); return; }
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    const url = URL.createObjectURL(file);
    blobUrlRef.current = url;
    let blob: Blob = file;
    if (type === 'audio' && !file.type.startsWith('audio/')) blob = new Blob([file], { type: 'audio/mp4' });
    let thumbnail: string | undefined;
    if (type === 'video') thumbnail = await generateVideoThumbnail(file);
    else if (type === 'photo') thumbnail = url;
    const item: MediaItem = {
      id: `native_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      type, url, blob, timestamp: Date.now(),
      thumbnail, filename: file.name || `capture_${Date.now()}`,
    };
    onMediaCaptured(item);
  };

  const handleFileChange = (type: RecordingMode) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { processFile(file, type); e.target.value = ''; }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleClose = () => {
    stopStream();
    setAudioState('idle');
    onClose?.();
  };

  // Audio recording UI
  if (audioState !== 'idle') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'linear-gradient(160deg, #0f0f14 0%, #13111c 100%)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-14 pb-4">
          <h2 className="text-white text-lg font-semibold tracking-tight">
            {audioState === 'preview' ? 'Review Recording' : 'Recording Audio'}
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
          {audioState === 'recording' && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 text-base font-mono tracking-widest">{formatTime(recordingSeconds)}</span>
              </div>
              <canvas
                ref={canvasRef}
                width={300}
                height={90}
                className="rounded-2xl"
                style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}
              />
              <button
                onClick={stopAudioRecording}
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-opacity active:opacity-80"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 0 32px rgba(239,68,68,0.4)' }}
              >
                <Square className="w-7 h-7 text-white fill-white" />
              </button>
            </>
          )}

          {audioState === 'preview' && previewUrl && (
            <>
              <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <audio src={previewUrl} controls className="w-full" style={{ colorScheme: 'dark' }} />
              </div>
              <div className="flex gap-3 w-full max-w-sm">
                <button
                  onClick={discardAudio}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-medium text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <X className="w-4 h-4" /> Redo
                </button>
                <button
                  onClick={confirmAudio}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white transition-colors"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 4px 20px rgba(124,58,237,0.4)' }}
                >
                  <Check className="w-4 h-4" /> Use This
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const options = [
    {
      icon: <Camera className="w-6 h-6" style={{ color: '#60a5fa' }} />,
      iconBg: 'rgba(59,130,246,0.15)',
      iconBorder: 'rgba(59,130,246,0.25)',
      label: 'Take Photo',
      description: 'Opens your camera',
      onClick: () => photoInputRef.current?.click(),
    },
    {
      icon: <Video className="w-6 h-6" style={{ color: '#f87171' }} />,
      iconBg: 'rgba(239,68,68,0.15)',
      iconBorder: 'rgba(239,68,68,0.25)',
      label: 'Record Video',
      description: 'Opens your camera',
      onClick: () => videoInputRef.current?.click(),
    },
    {
      icon: <Mic className="w-6 h-6" style={{ color: '#c084fc' }} />,
      iconBg: 'rgba(168,85,247,0.15)',
      iconBorder: 'rgba(168,85,247,0.25)',
      label: 'Record Audio',
      description: 'Uses your microphone',
      onClick: startAudioRecording,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'linear-gradient(160deg, #0f0f14 0%, #13111c 100%)' }}>
      <input ref={photoInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange('photo')} />
      <input ref={videoInputRef} type="file" accept="video/*" capture="environment" className="hidden" onChange={handleFileChange('video')} />

      {/* Header with close button */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <div>
          <h2 className="text-white text-xl font-bold tracking-tight">Capture Media</h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Choose what you'd like to capture</p>
        </div>
        <button
          onClick={handleClose}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors active:opacity-70"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.08)' }}
          aria-label="Close"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Options */}
      <div className="flex-1 flex flex-col justify-center px-5 gap-3 pb-12">
        {audioError && (
          <div className="mb-2 px-4 py-3 rounded-xl text-sm text-center" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
            {audioError}
          </div>
        )}

        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={opt.onClick}
            className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-left transition-all active:scale-[0.98]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: opt.iconBg, border: `1px solid ${opt.iconBorder}` }}
            >
              {opt.icon}
            </div>

            {/* Text — always stacked, never side-by-side */}
            <div className="flex flex-col min-w-0">
              <span className="text-white font-semibold text-base leading-snug">{opt.label}</span>
              <span className="text-sm leading-snug mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{opt.description}</span>
            </div>

            {/* Chevron */}
            <div className="ml-auto flex-shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
