/**
 * New Year (Fresh Start) Theme - Page 1: Add Media
 * Visual: Champagne bottle/glass theme, firework particles, sparkler trails
 * Colors: Purple/gold with NYE icons
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface NewYearStep1MediaProps {
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

export function NewYearStep1Media({
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
}: NewYearStep1MediaProps) {
  const [sparklers, setSparklers] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  // Generate sparkler trails on button interaction
  const addSparkler = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setSparklers(prev => [...prev, { id, x, y }]);
    
    // Remove sparkler after animation
    setTimeout(() => {
      setSparklers(prev => prev.filter(p => p.id !== id));
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Champagne Theme Card Container */}
      <Card className="border-4 border-purple-400 dark:border-purple-700 shadow-2xl bg-gradient-to-br from-purple-50 via-violet-50 to-amber-50 dark:from-purple-950 dark:via-violet-950 dark:to-amber-900 relative overflow-hidden">
        {/* Champagne Bubbles Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-5%',
                width: `${8 + Math.random() * 16}px`,
                height: `${8 + Math.random() * 16}px`,
              }}
              animate={{
                y: [0, -window.innerHeight * 1.2],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0.6, 0.8, 0.4, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Firework Particle Effects Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const colors = ['#9333EA', '#F59E0B', '#EC4899', '#3B82F6', '#10B981'];
            const color = colors[i % colors.length];
            
            return (
              <motion.div
                key={`firework-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut',
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Golden Glitter */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* NYE Header */}
        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center gap-3">
            {/* Champagne Glass Icon */}
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-amber-600 flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -10, 10, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
                🎆 New Year Memories
              </CardTitle>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                Start fresh with unforgettable moments
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

          {/* Purple/Gold NYE Upload Buttons - ALL 4 */}
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
                  addSparkler(e);
                  fileInputRef.current?.click();
                }}
                className="w-full h-24 bg-purple-300 md:bg-gradient-to-br md:from-purple-100 md:to-violet-200 dark:bg-purple-800 dark:md:from-purple-900 dark:md:to-violet-800 border-2 border-purple-400 dark:border-purple-600 hover:border-purple-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-medium text-purple-900 dark:text-purple-100 leading-tight text-center px-1">Photos</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">✨</div>
              </Button>
              
              {/* Animated sparkler trails on click */}
              <AnimatePresence>
                {sparklers.map(spark => (
                  <React.Fragment key={spark.id}>
                    {[...Array(8)].map((_, i) => {
                      const angle = (i / 8) * Math.PI * 2;
                      const distance = 80;
                      
                      return (
                        <motion.div
                          key={`${spark.id}-${i}`}
                          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                          animate={{ 
                            opacity: 0,
                            scale: 0,
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 2, ease: 'easeOut' }}
                          className="absolute pointer-events-none text-xl"
                          style={{ 
                            left: spark.x, 
                            top: spark.y,
                          }}
                        >
                          ✨
                        </motion.div>
                      );
                    })}
                  </React.Fragment>
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
                  addSparkler(e);
                  onVaultClick();
                }}
                className="w-full h-24 bg-gold-300 md:bg-gradient-to-br md:from-yellow-100 md:to-amber-200 dark:bg-amber-800 dark:md:from-yellow-900 dark:md:to-amber-800 border-2 border-amber-400 dark:border-amber-600 hover:border-amber-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-medium text-amber-900 dark:text-amber-100 leading-tight text-center px-1">Vault</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🌟</div>
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
                  addSparkler(e);
                  isMobile ? onOpenMobileRecorder('photo') : onRecordClick();
                }}
                className="w-full h-24 bg-blue-300 md:bg-gradient-to-br md:from-blue-100 md:to-sky-200 dark:bg-blue-800 dark:md:from-blue-900 dark:md:to-sky-800 border-2 border-blue-400 dark:border-blue-600 hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-medium text-blue-900 dark:text-blue-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🎆</div>
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
                  addSparkler(e);
                  onFolderClick();
                }}
                className="w-full h-24 bg-purple-300 md:bg-gradient-to-br md:from-purple-100 md:to-pink-200 dark:bg-purple-800 dark:md:from-purple-900 dark:md:to-pink-800 border-2 border-purple-400 dark:border-purple-600 hover:border-purple-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-medium text-purple-900 dark:text-purple-100 leading-tight text-center px-1">Folder</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🎇</div>
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

          {/* Media Grid with NYE Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Header with firework decoration */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-purple-300 dark:border-purple-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🎆</div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-amber-600 bg-clip-text text-transparent">
                    Resolution Gallery
                  </h3>
                  <Badge className="bg-purple-500 text-white">
                    {media.length}
                  </Badge>
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300">
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
                      {/* Sparkle badge number */}
                      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900">
                        {index + 1}
                      </div>

                      {/* Media Thumbnail */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-2 border-purple-300 dark:border-purple-700 hover:border-purple-500 transition-all shadow-md hover:shadow-xl"
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

                      {/* Sparkle decoration on hover */}
                      <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        ✨
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Empty State with NYE Theme */}
          {media.length === 0 && uploadQueue.files.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4"
            >
              <div className="text-6xl mb-4">🥂</div>
              <p className="text-purple-900 dark:text-purple-100 font-medium mb-2">
                Start your New Year memory collection
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Add moments from fresh starts and new beginnings
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}