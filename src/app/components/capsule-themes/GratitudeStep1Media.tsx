/**
 * Gratitude (Thankfulness) Theme - Page 1: Add Media
 * Visual: Thank you card opening animation, floating grateful hearts, candlelight glow
 * Colors: Warm orange/red with heart icons
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface GratitudeStep1MediaProps {
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

export function GratitudeStep1Media({
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
}: GratitudeStep1MediaProps) {
  const [viewportHeight] = useState(() => window.innerHeight);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [cardOpen, setCardOpen] = useState(false);
  
  // Generate floating hearts on button interaction
  const addFloatingHeart = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setFloatingHearts(prev => [...prev, { id, x, y }]);
    
    // Remove heart after animation
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(p => p.id !== id));
    }, 3000);
  };

  // Open card animation on mount
  React.useEffect(() => {
    const timer = setTimeout(() => setCardOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Thank You Card Container */}
      <Card className="border-4 border-orange-400 dark:border-orange-700 shadow-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-orange-950 dark:via-amber-950 dark:to-red-900 relative overflow-hidden">
        {/* Thank You Card Opening Animation - Left Fold */}
        <motion.div
          initial={{ scaleX: 1, originX: 0 }}
          animate={{ scaleX: cardOpen ? 0 : 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 z-20 border-r-4 border-amber-400 dark:border-amber-600"
          style={{ transformOrigin: 'left' }}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-6xl">💛</div>
          </div>
        </motion.div>

        {/* Warm Candlelight Glow */}
        <div className="absolute inset-0 pointer-events-none will-change-transform">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0.2) 30%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0.1) 50%, transparent 70%)',
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Floating Grateful Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10%',
              }}
              animate={{
                y: [0, -viewportHeight * 1.2],
                x: [0, Math.sin(i * 3) * 30],
                rotate: [0, 360],
                opacity: [0, 0.6, 0.8, 0.6, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            >
              💛
            </motion.div>
          ))}
        </div>

        {/* Autumn Leaves Decoration */}
        <div className="absolute inset-0 pointer-events-none will-change-transform">
          {[...Array(10)].map((_, i) => (
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
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {['🍂', '🍁'][i % 2]}
            </motion.div>
          ))}
        </div>

        {/* Gratitude Header */}
        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center gap-3">
            {/* Glowing Heart Icon */}
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(249, 115, 22, 0.5)',
                  '0 0 30px rgba(249, 115, 22, 0.8)',
                  '0 0 20px rgba(249, 115, 22, 0.5)',
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-6 h-6 text-white" fill="white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-serif bg-gradient-to-r from-orange-800 via-amber-700 to-orange-800 bg-clip-text text-transparent flex items-center gap-2">
                🙏 Grateful Memories
              </CardTitle>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Capture moments of thankfulness
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

          {/* Warm Thankful Upload Buttons - ALL 4 */}
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
                  addFloatingHeart(e);
                  fileInputRef.current?.click();
                }}
                className="w-full h-24 bg-orange-300 md:bg-gradient-to-br md:from-orange-100 md:to-amber-200 dark:bg-orange-800 dark:md:from-orange-900 dark:md:to-amber-800 border-2 border-orange-400 dark:border-orange-600 hover:border-orange-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-medium text-orange-900 dark:text-orange-100 leading-tight text-center px-1">Photos</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">💛</div>
              </Button>
              
              {/* Animated floating hearts on click */}
              <AnimatePresence>
                {floatingHearts.map(heart => (
                  <motion.div
                    key={heart.id}
                    initial={{ opacity: 1, scale: 0, rotate: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: 2, 
                      y: -150,
                      x: (Math.random() - 0.5) * 100,
                      rotate: Math.random() * 360
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, ease: 'easeOut' }}
                    className="absolute pointer-events-none text-3xl"
                    style={{ left: heart.x, top: heart.y }}
                  >
                    💛
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
                  addFloatingHeart(e);
                  onVaultClick();
                }}
                className="w-full h-24 bg-amber-300 md:bg-gradient-to-br md:from-amber-100 md:to-yellow-200 dark:bg-amber-800 dark:md:from-amber-900 dark:md:to-yellow-800 border-2 border-amber-400 dark:border-amber-600 hover:border-amber-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-medium text-amber-900 dark:text-amber-100 leading-tight text-center px-1">Vault</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🧡</div>
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
                  addFloatingHeart(e);
                  isMobile ? onOpenMobileRecorder('photo') : onRecordClick();
                }}
                className="w-full h-24 bg-yellow-300 md:bg-gradient-to-br md:from-yellow-100 md:to-orange-200 dark:bg-yellow-800 dark:md:from-yellow-900 dark:md:to-orange-800 border-2 border-yellow-400 dark:border-yellow-600 hover:border-yellow-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-medium text-yellow-900 dark:text-yellow-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">💚</div>
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
                  addFloatingHeart(e);
                  onFolderClick();
                }}
                className="w-full h-24 bg-orange-300 md:bg-gradient-to-br md:from-orange-100 md:to-red-200 dark:bg-orange-800 dark:md:from-orange-900 dark:md:to-red-800 border-2 border-orange-400 dark:border-orange-600 hover:border-orange-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-medium text-orange-900 dark:text-orange-100 leading-tight text-center px-1">Folder</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">❤️</div>
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

          {/* Media Grid with Gratitude Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Header with heart decoration */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-orange-300 dark:border-orange-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">💛</div>
                  <h3 className="text-lg font-serif bg-gradient-to-r from-orange-800 via-amber-700 to-orange-800 bg-clip-text text-transparent font-bold">
                    Gratitude Gallery
                  </h3>
                  <Badge className="bg-orange-500 text-white">
                    {media.length}
                  </Badge>
                </div>
                <div className="text-sm text-orange-700 dark:text-orange-300">
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
                      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900">
                        {index + 1}
                      </div>

                      {/* Media Thumbnail */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-2 border-orange-300 dark:border-orange-700 hover:border-orange-500 transition-all shadow-md hover:shadow-xl"
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
                        💛
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Empty State with Gratitude Theme */}
          {media.length === 0 && uploadQueue.files.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4"
            >
              <div className="text-6xl mb-4">🙏</div>
              <p className="text-orange-900 dark:text-orange-100 font-medium mb-2">
                Start your gratitude collection
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Add moments you're thankful for
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}