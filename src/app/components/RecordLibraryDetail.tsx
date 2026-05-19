import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  ArrowLeft,
  Trash2,
  Download,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  Video,
  Mic,
  Clock,
  Calendar,
  FileType,
  Info,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  MoreVertical
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Separator } from './ui/separator';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase/client';
import { projectId } from '../utils/supabase/info';

interface LibraryItem {
  id: string;
  type: 'photo' | 'video' | 'audio';
  base64Data: string;
  timestamp: number;
  thumbnail?: string;
  mimeType: string;
  fileSize?: number;
  duration?: number;
  metadata?: {
    width?: number;
    height?: number;
    deviceInfo?: string;
  };
}

interface RecordLibraryDetailProps {
  itemId: string;
  onBack: () => void;
  onDelete?: (itemId: string) => void;
  onItemUpdated?: () => void;
}

export function RecordLibraryDetail({ 
  itemId, 
  onBack, 
  onDelete,
  onItemUpdated 
}: RecordLibraryDetailProps) {
  const [item, setItem] = useState<LibraryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Media playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    loadItem();
  }, [itemId]);

  const loadItem = async () => {
    setIsLoading(true);
    
    try {
      // Try loading from localStorage first
      const stored = localStorage.getItem('recordLibrary');
      if (stored) {
        const library: LibraryItem[] = JSON.parse(stored);
        const foundItem = library.find(i => i.id === itemId);
        
        if (foundItem) {
          setItem(foundItem);
          setIsLoading(false);
          return;
        }
      }

      // If not in localStorage, try backend
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/record-library/${itemId}`,
          {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          const backendItem: LibraryItem = {
            id: data.id,
            type: data.type,
            base64Data: data.url,
            timestamp: data.timestamp,
            thumbnail: data.thumbnail,
            mimeType: data.file_type,
            fileSize: data.file_size,
            duration: data.duration,
            metadata: data.metadata
          };
          
          setItem(backendItem);
        } else {
          toast.error('Failed to load record');
          onBack();
        }
      } else {
        toast.error('Record not found');
        onBack();
      }
    } catch (error) {
      console.error('Failed to load item:', error);
      toast.error('Failed to load record');
      onBack();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      // Delete from localStorage
      const stored = localStorage.getItem('recordLibrary');
      if (stored) {
        const library: LibraryItem[] = JSON.parse(stored);
        const filtered = library.filter(i => i.id !== itemId);
        localStorage.setItem('recordLibrary', JSON.stringify(filtered));
      }

      // Try to delete from backend
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/record-library`,
            {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${session.access_token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ recordIds: [itemId] })
            }
          );
        }
      } catch (backendError) {
        console.warn('Backend deletion failed, but localStorage deletion succeeded:', backendError);
      }

      toast.success('Record deleted');
      onDelete?.(itemId);
      onBack();
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast.error('Failed to delete record');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleDownload = async () => {
    if (!item) return;

    try {
      let blob: Blob;
      let filename = `record-${item.id}`;

      if (item.base64Data.startsWith('http')) {
        // It's a URL - fetch it
        const response = await fetch(item.base64Data);
        blob = await response.blob();
      } else {
        // It's base64 - convert it
        const arr = item.base64Data.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || item.mimeType;
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        blob = new Blob([u8arr], { type: mime });
      }

      // Determine file extension
      const ext = item.type === 'photo' ? '.jpg' : item.type === 'video' ? '.mp4' : '.mp3';
      filename += ext;

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Download started');
    } catch (error) {
      console.error('Failed to download:', error);
      toast.error('Failed to download record');
    }
  };

  const handleShare = async () => {
    if (!item) return;

    try {
      if (navigator.share) {
        let blob: Blob;
        
        if (item.base64Data.startsWith('http')) {
          const response = await fetch(item.base64Data);
          blob = await response.blob();
        } else {
          const arr = item.base64Data.split(',');
          const mime = arr[0].match(/:(.*?);/)?.[1] || item.mimeType;
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          blob = new Blob([u8arr], { type: mime });
        }

        const ext = item.type === 'photo' ? '.jpg' : item.type === 'video' ? '.mp4' : '.mp3';
        const file = new File([blob], `record-${item.id}${ext}`, { type: blob.type });

        await navigator.share({
          title: `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} from Eras`,
          files: [file]
        });

        toast.success('Shared successfully');
      } else {
        toast.error('Sharing not supported on this device');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Failed to share:', error);
        toast.error('Failed to share record');
      }
    }
  };

  // Media playback handlers
  const togglePlayPause = () => {
    if (item?.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (item?.type === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const mediaElement = videoRef.current || audioRef.current;
    if (mediaElement) {
      setCurrentTime(mediaElement.currentTime);
      setDuration(mediaElement.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      const kb = bytes / 1024;
      return `${kb.toFixed(1)} KB`;
    }
    return `${mb.toFixed(2)} MB`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return {
      full: date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      short: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const getMediaUrl = () => {
    if (!item) return '';
    
    if (item.base64Data.startsWith('http')) {
      return item.base64Data;
    }
    
    return item.base64Data;
  };

  const getTypeIcon = () => {
    switch (item?.type) {
      case 'photo':
        return <ImageIcon className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'audio':
        return <Mic className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTypeBadgeColor = () => {
    switch (item?.type) {
      case 'photo':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'video':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'audio':
        return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
          
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
          
          <Card className="py-16">
            <CardContent className="text-center space-y-4">
              <div className="inline-block p-6 rounded-full bg-gray-100 dark:bg-gray-800">
                <AlertTriangle className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Record not found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This record may have been deleted or doesn't exist
                </p>
                <Button onClick={onBack} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Library
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const dateInfo = formatDate(item.timestamp);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto p-4 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4 mb-6"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {getTypeIcon()}
                <span className="capitalize">{item.type} Record</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                {dateInfo.short} at {dateInfo.time}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Media Display */}
              <div className="relative bg-black">
                {item.type === 'photo' && (
                  <img
                    src={getMediaUrl()}
                    alt="Photo record"
                    className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                  />
                )}

                {item.type === 'video' && (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      src={getMediaUrl()}
                      poster={item.thumbnail}
                      className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                      onTimeUpdate={handleTimeUpdate}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onLoadedMetadata={handleTimeUpdate}
                    />
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        onClick={togglePlayPause}
                        className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-black"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8" />
                        ) : (
                          <Play className="w-8 h-8 ml-1" />
                        )}
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    {duration > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center gap-3 text-white">
                          <span className="text-xs font-mono">
                            {formatTime(currentTime)}
                          </span>
                          <input
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                          />
                          <span className="text-xs font-mono">
                            {formatTime(duration)}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={toggleMute}
                            className="text-white hover:bg-white/20"
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {item.type === 'audio' && (
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
                    <audio
                      ref={audioRef}
                      src={getMediaUrl()}
                      onTimeUpdate={handleTimeUpdate}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onLoadedMetadata={handleTimeUpdate}
                    />
                    
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <motion.div
                          animate={{
                            scale: isPlaying ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            repeat: isPlaying ? Infinity : 0,
                            duration: 1.5,
                          }}
                          className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        >
                          <Mic className="w-12 h-12 text-white" />
                        </motion.div>
                        
                        {isPlaying && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-white/40"
                            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                        )}
                      </div>

                      <Button
                        size="lg"
                        onClick={togglePlayPause}
                        className="rounded-full bg-white/90 hover:bg-white text-black"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-5 h-5 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5 mr-2 ml-1" />
                            Play
                          </>
                        )}
                      </Button>

                      {duration > 0 && (
                        <div className="px-8 space-y-2">
                          <input
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-2 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                          />
                          <div className="flex justify-between text-white text-sm font-mono">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="p-6 space-y-6">
                {/* Type Badge */}
                <div className="flex items-center gap-3">
                  <Badge className={getTypeBadgeColor()}>
                    {getTypeIcon()}
                    <span className="ml-2 capitalize">{item.type}</span>
                  </Badge>
                </div>

                <Separator />

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Created</span>
                    </div>
                    <p className="text-sm font-medium">{dateInfo.full}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileType className="w-4 h-4" />
                      <span>File Type</span>
                    </div>
                    <p className="text-sm font-medium font-mono">{item.mimeType}</p>
                  </div>

                  {item.fileSize && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Info className="w-4 h-4" />
                        <span>File Size</span>
                      </div>
                      <p className="text-sm font-medium">{formatFileSize(item.fileSize)}</p>
                    </div>
                  )}

                  {duration > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Duration</span>
                      </div>
                      <p className="text-sm font-medium">{formatTime(duration)}</p>
                    </div>
                  )}

                  {item.metadata?.width && item.metadata?.height && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ImageIcon className="w-4 h-4" />
                        <span>Dimensions</span>
                      </div>
                      <p className="text-sm font-medium">
                        {item.metadata.width} × {item.metadata.height}
                      </p>
                    </div>
                  )}

                  {item.metadata?.deviceInfo && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Info className="w-4 h-4" />
                        <span>Device</span>
                      </div>
                      <p className="text-sm font-medium">{item.metadata.deviceInfo}</p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1 min-w-[140px]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 min-w-[140px]"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  
                  <Button
                    onClick={() => setShowDeleteDialog(true)}
                    variant="outline"
                    className="flex-1 min-w-[140px] text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold">About Record Library</h3>
                  <p className="text-sm text-muted-foreground">
                    Your records are stored locally on your device and synced to the cloud. 
                    You can use these records when creating new capsules, or download them for safekeeping.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Delete Record?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>
                  This will permanently delete this {item?.type} record from your library.
                </p>
                <p className="text-red-600 dark:text-red-400 font-medium">
                  This action cannot be undone.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Record
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
