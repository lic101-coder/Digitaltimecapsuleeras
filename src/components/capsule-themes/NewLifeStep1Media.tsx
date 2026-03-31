/**
 * New Life (Baby) Theme - Page 1: Add Media
 * Visual: Soft clouds, baby mobile, twinkling stars, pastel colors
 * Colors: Purple/pink/blue pastels with baby icons
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Baby } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface NewLifeStep1MediaProps {
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

export function NewLifeStep1Media({
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
}: NewLifeStep1MediaProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);
  
  // Add sparkle on interaction
  const addSparkle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    const emojis = ['✨', '⭐', '💫', '🌟', '💖', '🦋'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    setSparkles(prev => [...prev, { id, x, y, emoji }]);
    
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== id));
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Cloud Container */}
      <Card className="border-4 border-purple-300 dark:border-purple-700 shadow-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 relative overflow-hidden">
        {/* Soft Cloud Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className="absolute text-6xl"
              style={{
                left: `${i * 20}%`,
                top: `${(i % 3) * 30}%`,
              }}
              animate={{
                x: [0, 30, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              ☁️
            </motion.div>
          ))}
        </div>

        {/* Twinkling Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-yellow-300 text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>

        {/* Interactive Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {sparkles.map(sparkle => (
              <motion.div
                key={sparkle.id}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1, 0.5],
                  y: [0, -50],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute text-2xl"
                style={{ 
                  left: sparkle.x, 
                  top: sparkle.y,
                }}
              >
                {sparkle.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Baby Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`baby-${i}`}
              className="absolute text-3xl opacity-20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {['👶', '🍼', '🎈', '🧸', '🌙', '💫', '🦋', '💝'][i]}
            </motion.div>
          ))}
        </div>

        {/* Baby Mobile - Rotating Above Center */}
        <motion.div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 z-[15] pointer-events-none"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="relative w-32 h-32">
            {[0, 90, 180, 270].map((angle, i) => (
              <motion.div
                key={`mobile-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                style={{
                  transform: `rotate(${angle}deg) translateY(-40px)`,
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {i === 0 ? '🌙' : i === 1 ? '⭐' : i === 2 ? '☁️' : '💫'}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Baby Bottle Header */}
        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Baby className="w-6 h-6 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-handwriting bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                💫 New Life Memories
              </CardTitle>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1 font-handwriting">
                Precious moments with your little one
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          {/* Hidden File Inputs */}
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

          {/* Cloud-themed Buttons - ALL 4 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Button 1: Upload */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={addSparkle}
              onClick={addSparkle}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 bg-sky-300 md:bg-gradient-to-br md:from-sky-100 md:to-blue-200 dark:bg-sky-800 dark:md:from-sky-900 dark:md:to-blue-800 border-2 border-sky-400 dark:border-sky-600 hover:border-sky-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-medium text-sky-900 dark:text-sky-100 leading-tight text-center px-1">Photos</span>
                </div>
              </Button>
            </motion.div>

            {/* Button 2: Vault */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={addSparkle}
              onClick={addSparkle}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => onVaultClick()}
                className="w-full h-24 bg-indigo-300 md:bg-gradient-to-br md:from-indigo-100 md:to-purple-200 dark:bg-indigo-800 dark:md:from-indigo-900 dark:md:to-purple-800 border-2 border-indigo-400 dark:border-indigo-600 hover:border-indigo-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-medium text-indigo-900 dark:text-indigo-100 leading-tight text-center px-1">Vault</span>
                </div>
              </Button>
            </motion.div>

            {/* Button 3: Camera/Record */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={addSparkle}
              onClick={addSparkle}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => isMobile ? onOpenMobileRecorder('photo') : onRecordClick()}
                className="w-full h-24 bg-teal-300 md:bg-gradient-to-br md:from-teal-100 md:to-cyan-200 dark:bg-teal-800 dark:md:from-teal-900 dark:md:to-cyan-800 border-2 border-teal-400 dark:border-teal-600 hover:border-teal-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-medium text-teal-900 dark:text-teal-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
                </div>
              </Button>
            </motion.div>

            {/* Button 4: Folder */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={addSparkle}
              onClick={addSparkle}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => onFolderClick()}
                className="w-full h-24 bg-violet-300 md:bg-gradient-to-br md:from-violet-100 md:to-purple-200 dark:bg-violet-800 dark:md:from-violet-900 dark:md:to-purple-800 border-2 border-violet-400 dark:border-violet-600 hover:border-violet-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-medium text-violet-900 dark:text-violet-100 leading-tight text-center px-1">Folder</span>
                </div>
              </Button>
            </motion.div>
          </div>

          {/* Upload Queue Manager */}
          <UploadQueueManager
            files={uploadQueue.files}
            onRemove={uploadQueue.removeFile}
            onPause={uploadQueue.pauseFile}
            onResume={uploadQueue.resumeFile}
            onRetry={uploadQueue.retryFile}
            onClearCompleted={uploadQueue.clearCompleted}
            onClearAll={uploadQueue.clearAll}
          />

          {/* Media Grid with Cloud Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b-2 border-purple-300 dark:border-purple-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">👶</div>
                  <h3 className="text-lg font-handwriting bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    Memory Collection
                  </h3>
                  <Badge className="bg-purple-500 text-white">{media.length}</Badge>
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300">
                  {formatFileSize(totalMediaSize)}
                </div>
              </div>

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
                      {/* Star number badge */}
                      <div className="absolute -top-2 -left-2 z-10 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900">
                        {index + 1}
                      </div>

                      {/* Cloud border */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-4 border-purple-300 dark:border-purple-700 hover:border-purple-400 transition-all shadow-md hover:shadow-xl"
                        style={{ boxShadow: '0 4px 6px rgba(168, 85, 247, 0.1), 0 2px 4px rgba(168, 85, 247, 0.06)' }}
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

                      {/* Sparkle on hover */}
                      <div className="absolute top-2 right-2 text-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        ✨
                      </div>
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
              className="text-center py-12 px-4"
            >
              <motion.div 
                className="text-6xl mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                👶
              </motion.div>
              <p className="text-purple-900 dark:text-purple-100 font-handwriting text-xl mb-2">
                Welcome to the world, little one!
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Start capturing precious moments
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}