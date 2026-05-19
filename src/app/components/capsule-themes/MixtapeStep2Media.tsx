import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, Mic, Video, Folder, FolderOpen, Trash2, Download, X, Music, Play, Pause, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface MixtapeStep2MediaProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  folderInputRef: React.RefObject<HTMLInputElement>;
  uploadQueue: any;
  media: any[];
  onRemoveMedia: (id: string) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFolderClick: () => void;
  onRecordClick: () => void;
  onVaultClick: () => void;
  onPreviewMedia: (mediaItem: any) => void;
  onOpenMobileRecorder: (mode: 'photo' | 'video' | 'audio') => void;
  isMobile: boolean;
  totalMediaSize: number;
  formatFileSize: (bytes: number) => string;
  onDownloadMedia?: (mediaItem: any) => void;
}

export function MixtapeStep2Media({
  fileInputRef,
  folderInputRef,
  uploadQueue,
  media,
  onRemoveMedia,
  onFileSelect,
  onFolderClick,
  onRecordClick,
  onVaultClick,
  onPreviewMedia,
  onOpenMobileRecorder,
  isMobile,
  totalMediaSize,
  formatFileSize,
  onDownloadMedia,
}: MixtapeStep2MediaProps) {
  const [reelRotation, setReelRotation] = useState(0);
  const [vuMeterLevels, setVuMeterLevels] = useState([0, 0, 0, 0, 0, 0, 0, 8]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Animate reels when there's activity
  useEffect(() => {
    const hasActivity = media.length > 0 || uploadQueue.files.length > 0;
    setIsPlaying(hasActivity);

    if (!hasActivity) return;

    const reelInterval = setInterval(() => {
      setReelRotation(prev => prev + 5);
    }, 50);

    const vuInterval = setInterval(() => {
      setVuMeterLevels(prev => prev.map(() => Math.random() * 100));
    }, 120);

    return () => {
      clearInterval(reelInterval);
      clearInterval(vuInterval);
    };
  }, [media.length, uploadQueue.files.length]);

  return (
    <Card className="border-2 border-teal-500/30 bg-gradient-to-br from-slate-900 via-teal-950/20 to-slate-900 shadow-xl relative overflow-hidden">
      {/* Retro scan lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #2dd4bf 2px, #2dd4bf 3px)',
      }} />

      <CardHeader className="border-b border-teal-500/20 bg-teal-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
            >
              <Music className="w-6 h-6 text-teal-400" />
            </motion.div>
            <div>
              <CardTitle className="text-teal-400 font-mono text-xl">MIXTAPE TRACKS</CardTitle>
              <p className="text-xs text-teal-300/60 font-mono mt-0.5">Add your memories to the mix</p>
            </div>
          </div>
          
          {/* Mini VU Meters */}
          <div className="flex gap-0.5">
            {vuMeterLevels.map((level, i) => (
              <div key={i} className="w-1.5 h-8 bg-slate-800/50 rounded-full overflow-hidden border border-teal-500/20">
                <motion.div
                  className="w-full bg-gradient-to-t from-teal-500 to-teal-300"
                  style={{ height: isPlaying ? `${level}%` : '0%' }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Cassette Tape Visualization */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg p-6 border-2 border-amber-300/50 shadow-lg"
        >
          {/* Cassette Label Area */}
          <div className="text-center mb-4">
            <p className="text-sm font-bold text-slate-800 font-handwriting">FRIENDSHIP MIX</p>
            <p className="text-xs text-slate-600 font-handwriting">
              {media.length} {media.length === 1 ? 'track' : 'tracks'} loaded
            </p>
          </div>

          {/* Tape Reels */}
          <div className="flex justify-center gap-12 items-center mb-4">
            {/* Left Reel */}
            <motion.div
              animate={{ rotate: isPlaying ? reelRotation : 0 }}
              transition={{ duration: 0.1, ease: 'linear' }}
              className="relative"
            >
              <div className="w-14 h-14 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-5 bg-slate-600 rounded"
                      style={{ transform: `rotate(${angle}deg)` }}
                    />
                  ))}
                </div>
                <div className="w-2 h-2 bg-slate-900 rounded-full z-10" />
              </div>
            </motion.div>

            {/* Tape visible section */}
            <div className="relative">
              <motion.div
                animate={{ scaleX: isPlaying ? [1, 0.95, 1] : 1 }}
                transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                className="w-16 h-0.5 bg-amber-800/60"
              />
              {media.length > 0 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <Badge variant="outline" className="text-[10px] bg-teal-500/10 text-teal-400 border-teal-500/30">
                    {formatFileSize(totalMediaSize)}
                  </Badge>
                </div>
              )}
            </div>

            {/* Right Reel */}
            <motion.div
              animate={{ rotate: isPlaying ? reelRotation : 0 }}
              transition={{ duration: 0.1, ease: 'linear' }}
              className="relative"
            >
              <div className="w-14 h-14 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-5 bg-slate-600 rounded"
                      style={{ transform: `rotate(${angle}deg)` }}
                    />
                  ))}
                </div>
                <div className="w-2 h-2 bg-slate-900 rounded-full z-10" />
              </div>
            </motion.div>
          </div>

          {/* Cassette Details */}
          <div className="flex justify-center gap-4 text-[9px] text-slate-600 font-mono">
            <span>SIDE A</span>
            <span>•</span>
            <span>CHROME</span>
            <span>•</span>
            <span>90 MIN</span>
          </div>
        </motion.div>

        {/* Upload Buttons - ALL 4 ALWAYS VISIBLE */}
        <div 
          className="grid gap-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '0.75rem'
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileSelect}
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            className="hidden"
          />
          <input
            type="file"
            ref={folderInputRef}
            onChange={onFileSelect}
            multiple
            // @ts-ignore - webkitdirectory is not in the types
            webkitdirectory=""
            className="hidden"
          />

          {/* Button 1: FILES */}
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="relative bg-slate-800 border-2 border-teal-500/30 hover:border-teal-500 hover:bg-slate-750 text-teal-400 h-auto py-4 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-teal-500/5 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <div className="relative flex flex-col items-center gap-1">
              <Upload className="w-5 h-5" />
              <span className="text-xs font-mono">FILES</span>
            </div>
          </Button>

          {/* Button 2: FOLDER */}
          <Button
            onClick={onFolderClick}
            variant="outline"
            className="relative bg-slate-800 border-2 border-teal-500/30 hover:border-teal-500 hover:bg-slate-750 text-teal-400 h-auto py-4 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-teal-500/5 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <div className="relative flex flex-col items-center gap-1">
              <FolderOpen className="w-5 h-5" />
              <span className="text-xs font-mono">FOLDER</span>
            </div>
          </Button>

          {/* Button 3: PHOTO/CAMERA (mobile) or RECORD (desktop) */}
          <Button
            onClick={isMobile ? () => onOpenMobileRecorder('photo') : onRecordClick}
            variant="outline"
            className="relative bg-slate-800 border-2 border-teal-500/30 hover:border-teal-500 hover:bg-slate-750 text-teal-400 h-auto py-4 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-teal-500/5 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <div className="relative flex flex-col items-center gap-1">
              {isMobile ? <Camera className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              <span className="text-xs font-mono">{isMobile ? 'PHOTO' : 'RECORD'}</span>
            </div>
          </Button>

          {/* Button 4: VAULT */}
          <Button
            onClick={onVaultClick}
            variant="outline"
            className="relative bg-slate-800 border-2 border-teal-500/30 hover:border-teal-500 hover:bg-slate-750 text-teal-400 h-auto py-4 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-teal-500/5 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <div className="relative flex flex-col items-center gap-1">
              <Folder className="w-5 h-5" />
              <span className="text-xs font-mono">VAULT</span>
            </div>
          </Button>
        </div>

        {/* Upload Queue */}
        {uploadQueue.files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <UploadQueueManager
              files={uploadQueue.files}
              onRemove={uploadQueue.removeFile}
              onPause={uploadQueue.pauseFile}
              onResume={uploadQueue.resumeFile}
              onRetry={uploadQueue.retryFile}
              onClearCompleted={uploadQueue.clearCompleted}
              onClearAll={uploadQueue.clearAll}
            />
          </motion.div>
        )}

        {/* Media Grid */}
        {media.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-mono text-teal-300">
                Track Listing:
              </p>
              <Badge variant="outline" className="bg-teal-500/10 text-teal-400 border-teal-500/30 font-mono">
                {media.length} / ∞
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <AnimatePresence mode="popLayout">
                {media.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group"
                  >
                    {/* Track number badge */}
                    <div className="absolute -top-2 -left-2 z-10 w-6 h-6 rounded-full bg-teal-500 border-2 border-slate-900 flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-900">{index + 1}</span>
                    </div>

                    <MediaThumbnail
                      mediaFile={{
                        id: item.id,
                        file_name: item.file?.name,
                        file_type: item.mimeType,
                        url: item.url,
                        thumbnail: item.thumbnail,
                      }}
                      size="lg"
                      onClick={() => onPreviewMedia(item)}
                    />

                    {/* Delete button overlay */}
                    <div className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-auto px-3 py-1.5 bg-red-500 hover:bg-red-600 shadow-lg flex items-center gap-1.5 text-white font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveMedia(item.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="text-sm">Delete</span>
                      </Button>
                    </div>

                    {/* Download button if provided */}
                    {onDownloadMedia && (
                      <div className="absolute top-2 right-12 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDownloadMedia(item);
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {media.length === 0 && uploadQueue.files.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 border-2 border-dashed border-teal-500/30 rounded-lg bg-teal-950/10"
          >
            <Music className="w-12 h-12 text-teal-500/30 mx-auto mb-3" />
            <p className="text-teal-400/60 font-mono text-sm">
              Your mixtape is empty
            </p>
            <p className="text-teal-500/40 text-xs mt-1 font-mono">
              Add some tracks to get started
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}