import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, Video, Mic, Square, Play, Pause, Check, X } from 'lucide-react';

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

export function NativeCaptureUI({ onMediaCaptured }: NativeCaptureUIProps) {
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

      // Set up analyser for waveform
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
    } catch (err) {
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

  // Audio recording UI
  if (audioState !== 'idle') {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold tracking-tight">
            {audioState === 'preview' ? 'Review Recording' : 'Recording Audio'}
          </h2>
          {audioState === 'recording' && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-sm font-mono">{formatTime(recordingSeconds)}</span>
            </div>
          )}
        </div>

        {audioState === 'recording' && (
          <canvas ref={canvasRef} width={280} height={80} className="rounded-xl bg-purple-950/50 border border-purple-800/40" />
        )}

        {audioState === 'preview' && previewUrl && (
          <div className="w-full max-w-xs">
            <audio src={previewUrl} controls className="w-full rounded-xl" />
          </div>
        )}

        <div className="flex gap-4">
          {audioState === 'recording' && (
            <button
              onClick={stopAudioRecording}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center shadow-lg shadow-red-500/40"
            >
              <Square className="w-6 h-6 text-white fill-white" />
            </button>
          )}
          {audioState === 'preview' && (
            <>
              <button
                onClick={discardAudio}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium"
              >
                <X className="w-5 h-5" /> Redo
              </button>
              <button
                onClick={confirmAudio}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg"
              >
                <Check className="w-5 h-5" /> Use This
              </button>
            </>
          )}
        </div>

        <button onClick={() => { stopStream(); setAudioState('idle'); }} className="text-white/40 text-sm hover:text-white/60">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-8 px-6">
      <input ref={photoInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange('photo')} />
      <input ref={videoInputRef} type="file" accept="video/*" capture="environment" className="hidden" onChange={handleFileChange('video')} />

      <div className="text-center">
        <h2 className="text-white text-2xl font-bold tracking-tight">Capture Media</h2>
        <p className="text-white/50 text-sm mt-1">Choose what you'd like to capture</p>
      </div>

      {audioError && <p className="text-red-400 text-sm text-center max-w-xs">{audioError}</p>}

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button onClick={() => photoInputRef.current?.click()} className="flex items-center gap-4 w-full px-6 py-5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors border border-white/15">
          <div className="p-3 rounded-xl bg-blue-500/20"><Camera className="w-6 h-6 text-blue-300" /></div>
          <div className="text-left">
            <div className="text-white font-semibold text-base">Take Photo</div>
            <div className="text-white/50 text-xs mt-0.5">Opens your camera</div>
          </div>
        </button>

        <button onClick={() => videoInputRef.current?.click()} className="flex items-center gap-4 w-full px-6 py-5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors border border-white/15">
          <div className="p-3 rounded-xl bg-red-500/20"><Video className="w-6 h-6 text-red-300" /></div>
          <div className="text-left">
            <div className="text-white font-semibold text-base">Record Video</div>
            <div className="text-white/50 text-xs mt-0.5">Opens your camera</div>
          </div>
        </button>

        <button onClick={startAudioRecording} className="flex items-center gap-4 w-full px-6 py-5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors border border-white/15">
          <div className="p-3 rounded-xl bg-purple-500/20"><Mic className="w-6 h-6 text-purple-300" /></div>
          <div className="text-left">
            <div className="text-white font-semibold text-base">Record Audio</div>
            <div className="text-white/50 text-xs mt-0.5">Uses your microphone</div>
          </div>
        </button>
      </div>
    </div>
  );
}
