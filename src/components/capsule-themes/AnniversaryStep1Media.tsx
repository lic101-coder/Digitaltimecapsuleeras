/**
 * Anniversary (Love) Theme - Page 1: Add Media
 * Visual: Velvet curtain reveal with rose decorations and candlelit ambiance
 * Colors: Deep rose/burgundy with romantic accents
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface AnniversaryStep1MediaProps {
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

export function AnniversaryStep1Media({
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
}: AnniversaryStep1MediaProps) {
  const [heartConfetti, setHeartConfetti] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [curtainOpen, setCurtainOpen] = useState(false);
  
  // Generate heart confetti on button interaction
  const addConfetti = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setHeartConfetti(prev => [...prev, { id, x, y }]);
    
    // Remove confetti after animation
    setTimeout(() => {
      setHeartConfetti(prev => prev.filter(p => p.id !== id));
    }, 2000);
  };

  // Open curtain on mount
  React.useEffect(() => {
    const timer = setTimeout(() => setCurtainOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Velvet Curtain Effect */}
      <AnimatePresence>
        {!curtainOpen && (
          <>
            {/* Left Curtain */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 z-50 shadow-2xl"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 8px, rgba(0,0,0,0.1) 10px)'
              }}
            />
            {/* Right Curtain */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-rose-900 via-rose-800 to-rose-900 z-50 shadow-2xl"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 8px, rgba(0,0,0,0.1) 10px)'
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Romantic Card Container */}
      <Card className="border-rose-300 dark:border-rose-700 shadow-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 dark:from-rose-950 dark:via-pink-950 dark:to-rose-900 relative overflow-hidden">
        {/* Candlelit Ambiance - Flickering Candles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${15 + i * 15}%`,
                top: i % 2 === 0 ? '10%' : '80%',
              }}
              animate={{
                opacity: [0.3, 0.7, 0.5, 0.8, 0.4],
                scale: [1, 1.1, 0.9, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              🕯️
            </motion.div>
          ))}
        </div>

        {/* Blooming Roses Border */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner roses with bloom animation */}
          {[
            { pos: 'top-2 left-2', delay: 0 },
            { pos: 'top-2 right-2', delay: 0.2 },
            { pos: 'bottom-2 left-2', delay: 0.4 },
            { pos: 'bottom-2 right-2', delay: 0.6 },
          ].map((rose, i) => (
            <motion.div
              key={i}
              className={`absolute ${rose.pos} text-4xl`}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                delay: rose.delay,
                type: 'spring',
                stiffness: 200,
              }}
            >
              🌹
            </motion.div>
          ))}
        </div>

        {/* Heart Header */}
        <CardHeader className="relative pb-4">
          <div className="flex items-center gap-3">
            {/* Beating Heart Icon */}
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-6 h-6 text-white" fill="white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-rose-900 dark:text-rose-100 flex items-center gap-2">
                💕 Love Story Collection
              </CardTitle>
              <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">
                Capture memories of your beautiful journey together
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative">
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

          {/* Anniversary Upload Buttons - ALL 4 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Button 1: Upload Files */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  addConfetti(e);
                  fileInputRef.current?.click();
                }}
                className="w-full h-24 bg-rose-300 md:bg-gradient-to-br md:from-rose-100 md:to-pink-100 dark:bg-rose-800 dark:md:from-rose-900 dark:md:to-pink-900 border-2 border-rose-300 dark:border-rose-700 hover:border-rose-400 hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-bold text-rose-900 dark:text-rose-100 leading-tight text-center px-1">Photos</span>
                </div>
              </Button>
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
                className="w-full h-24 bg-pink-300 md:bg-gradient-to-br md:from-pink-100 md:to-rose-100 dark:bg-pink-800 dark:md:from-pink-900 dark:md:to-rose-900 border-2 border-pink-300 dark:border-pink-700 hover:border-pink-400 hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-bold text-pink-900 dark:text-pink-100 leading-tight text-center px-1">Vault</span>
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
                className="w-full h-24 bg-red-300 md:bg-gradient-to-br md:from-red-100 md:to-rose-100 dark:bg-red-800 dark:md:from-red-900 dark:md:to-rose-900 border-2 border-red-300 dark:border-red-700 hover:border-red-400 hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-bold text-red-900 dark:text-red-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
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
                className="w-full h-24 bg-rose-300 md:bg-gradient-to-br md:from-rose-100 md:to-red-100 dark:bg-rose-800 dark:md:from-rose-900 dark:md:to-red-900 border-2 border-rose-300 dark:border-rose-700 hover:border-rose-400 hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-bold text-rose-900 dark:text-rose-100 leading-tight text-center px-1">Folder</span>
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

          {/* Media Grid with Romantic Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Header with hearts decoration */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-rose-300 dark:border-rose-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">💝</div>
                  <h3 className="text-lg font-bold text-rose-900 dark:text-rose-100">
                    Our Love Story
                  </h3>
                  <Badge className="bg-rose-500 text-white">
                    {media.length}
                  </Badge>
                </div>
                <div className="text-sm text-rose-700 dark:text-rose-300">
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
                      {/* Heart badge number */}
                      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-rose-900">
                        {index + 1}
                      </div>

                      {/* Media Thumbnail */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-2 border-rose-300 dark:border-rose-700 hover:border-rose-500 transition-all shadow-md hover:shadow-xl"
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

                      {/* Heart decoration on hover */}
                      <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        💕
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Empty State with Romantic Theme */}
          {media.length === 0 && uploadQueue.files.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4"
            >
              <div className="text-6xl mb-4">💕</div>
              <p className="text-rose-900 dark:text-rose-100 font-medium mb-2">
                Begin your love story collection
              </p>
              <p className="text-sm text-rose-700 dark:text-rose-300">
                Add photos, videos, or memories of your journey together
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}