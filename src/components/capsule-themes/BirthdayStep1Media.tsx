/**
 * Birthday (Party) Theme - Page 1: Add Media
 * Visual: Gift box wrapper with ribbon, floating balloons with helium physics, confetti bursts
 * Colors: Colorful (red/yellow/blue) with party icons
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface BirthdayStep1MediaProps {
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

export function BirthdayStep1Media({
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
  onDownloadMedia
}: BirthdayStep1MediaProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  // Generate confetti on button interaction
  const addConfetti = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setConfetti(prev => [...prev, { id, x, y }]);
    
    // Remove confetti after animation
    setTimeout(() => {
      setConfetti(prev => prev.filter(p => p.id !== id));
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Gift Box Card Container */}
      <Card className="border-4 border-red-400 dark:border-red-700 shadow-2xl bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50 dark:from-red-950 dark:via-yellow-950 dark:to-blue-900 relative overflow-hidden">
        {/* Gift Wrapping Paper Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #fbbf24 20%, transparent 20%), radial-gradient(circle, #ef4444 20%, transparent 20%)',
            backgroundPosition: '0 0, 20px 20px',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Big Ribbon Bow on Top */}
        <div className="absolute -top-12 md:-top-6 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-5xl md:text-6xl"
          >
            🎀
          </motion.div>
        </div>

        {/* Vertical Ribbon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 md:w-16 h-full bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-400 z-10 opacity-80" />

        {/* Floating Balloons with Helium Physics */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10%',
              }}
              animate={{
                y: [0, -window.innerHeight * 1.2],
                x: [0, Math.sin(i) * 50, -Math.sin(i) * 30, Math.sin(i) * 40],
                rotate: [0, 15, -15, 10, -10, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            >
              {['🎈', '🎈', '🎈'][Math.floor(Math.random() * 3)]}
            </motion.div>
          ))}
        </div>

        {/* Party Confetti Background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              {['🎊', '🎉', '✨', '⭐'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>

        {/* Party Header */}
        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center gap-3">
            {/* Spinning Gift Icon */}
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg"
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Gift className="w-6 h-6 text-white" fill="white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 via-yellow-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                🎂 Birthday Memories
              </CardTitle>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Capture the celebration and joy
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          {/* Hidden File Inputs - CRITICAL: Must render these exactly as-is */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,audio/*,application/pdf,.pdf,.doc,.docx,.txt"
            multiple
            className="hidden"
            onChange={onFileSelect}
          />
          
          <input
            ref={folderInputRef}
            type="file"
            // @ts-ignore
            webkitdirectory=""
            directory=""
            multiple
            className="hidden"
            onChange={onFileSelect}
          />

          {/* Colorful Party Upload Buttons - ALL 4 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Button 1: Upload Files */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  addConfetti(e);
                  fileInputRef.current?.click();
                }}
                className="w-full h-24 bg-red-300 md:bg-gradient-to-br md:from-red-100 md:to-red-200 dark:bg-red-800 dark:md:from-red-900 dark:md:to-red-800 border-2 border-red-400 dark:border-red-600 hover:border-red-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-bold text-red-900 dark:text-red-100 leading-tight text-center px-1">Photos</span>
                </div>
              </Button>
              
              {/* Animated confetti burst on click */}
              <AnimatePresence>
                {confetti.map(conf => (
                  <motion.div
                    key={conf.id}
                    initial={{ opacity: 1, scale: 0, rotate: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: 2, 
                      y: [0, -100, -150],
                      x: [(Math.random() - 0.5) * 100],
                      rotate: Math.random() * 720
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, ease: 'easeOut' }}
                    className="absolute pointer-events-none text-2xl"
                    style={{ left: conf.x, top: conf.y }}
                  >
                    {['🎊', '🎉', '✨', '⭐', '🎈'][Math.floor(Math.random() * 5)]}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Button 2: Vault */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  addConfetti(e);
                  onVaultClick();
                }}
                className="w-full h-24 bg-blue-300 md:bg-gradient-to-br md:from-blue-100 md:to-blue-200 dark:bg-blue-800 dark:md:from-blue-900 dark:md:to-blue-800 border-2 border-blue-400 dark:border-blue-600 hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-bold text-blue-900 dark:text-blue-100 leading-tight text-center px-1">Vault</span>
                </div>
              </Button>
            </motion.div>

            {/* Button 3: Record/Camera */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  addConfetti(e);
                  isMobile ? onOpenMobileRecorder('photo') : onRecordClick();
                }}
                className="w-full h-24 bg-yellow-300 md:bg-gradient-to-br md:from-yellow-100 md:to-yellow-200 dark:bg-yellow-800 dark:md:from-yellow-900 dark:md:to-yellow-800 border-2 border-yellow-400 dark:border-yellow-600 hover:border-yellow-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-bold text-yellow-900 dark:text-yellow-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
                </div>
              </Button>
            </motion.div>

            {/* Button 4: Folder */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  addConfetti(e);
                  onFolderClick();
                }}
                className="w-full h-24 bg-green-300 md:bg-gradient-to-br md:from-green-100 md:to-green-200 dark:bg-green-800 dark:md:from-green-900 dark:md:to-green-800 border-2 border-green-400 dark:border-green-600 hover:border-green-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-bold text-green-900 dark:text-green-100 leading-tight text-center px-1">Folder</span>
                </div>
              </Button>
            </motion.div>
          </div>

          {/* Upload Queue Manager - CRITICAL: Must render with exact props */}
          <UploadQueueManager
            files={uploadQueue.files}
            onRemove={uploadQueue.removeFile}
            onPause={uploadQueue.pauseFile}
            onResume={uploadQueue.resumeFile}
            onRetry={uploadQueue.retryFile}
            onClearCompleted={uploadQueue.clearCompleted}
            onClearAll={uploadQueue.clearAll}
          />

          {/* Media Grid with Party Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Header with party decoration */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-red-300 dark:border-red-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🎉</div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-red-600 via-yellow-600 to-blue-600 bg-clip-text text-transparent">
                    Party Gallery
                  </h3>
                  <Badge className="bg-red-500 text-white">
                    {media.length}
                  </Badge>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {formatFileSize(totalMediaSize)}
                </div>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {media.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="relative group"
                    >
                      {/* Party hat badge number */}
                      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900">
                        {index + 1}
                      </div>

                      {/* Media Thumbnail */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-2 border-red-300 dark:border-red-700 hover:border-red-500 transition-all shadow-md hover:shadow-xl"
                      >
                        <MediaThumbnail
                          mediaFile={{
                            id: item.id,
                            file_name: item.file?.name || item.name,
                            file_type: item.mimeType || item.type,
                            url: item.url,
                            thumbnail: item.thumbnail,
                          }}
                          size="lg"
                          showOverlay={true}
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
                        {onDownloadMedia && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDownloadMedia(item);
                            }}
                            className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveMedia(item.id);
                          }}
                          className="h-auto px-3 py-1.5 bg-red-500 hover:bg-red-600 shadow-lg flex items-center gap-1.5 text-white font-medium"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm">Delete</span>
                        </Button>
                      </div>

                      {/* Balloon decoration on hover */}
                      <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        🎈
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Empty State with Party Theme */}
          {media.length === 0 && uploadQueue.files.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4"
            >
              <div className="text-6xl mb-4">🎂</div>
              <p className="text-gray-900 dark:text-gray-100 font-medium mb-2">
                Start your birthday memory collection
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Add photos, videos, or fun moments from the celebration
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}