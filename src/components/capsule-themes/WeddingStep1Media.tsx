/**
 * Wedding (Romance) Theme - Page 1: Add Media
 * Visual: Elegant parchment card with wax seal corners, rose petals, calligraphy borders
 * Colors: Golden borders with serif font and romantic icons
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface WeddingStep1MediaProps {
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

export function WeddingStep1Media({
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
}: WeddingStep1MediaProps) {
  const [rosePetals, setRosePetals] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  // Generate rose petals on button hover
  const addRosePetal = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    
    setRosePetals(prev => [...prev, { id, x, y }]);
    
    // Remove petal after animation
    setTimeout(() => {
      setRosePetals(prev => prev.filter(p => p.id !== id));
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Elegant Parchment Card Container */}
      <Card className="border-4 border-amber-400 dark:border-amber-700 shadow-2xl bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 dark:from-amber-950 dark:via-rose-950 dark:to-pink-900 relative overflow-hidden">
        {/* Wax Seal Corners */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-amber-600 z-20 flex items-center justify-center shadow-lg">
          <div className="text-xs text-amber-200 font-serif">💍</div>
        </div>
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-amber-600 z-20 flex items-center justify-center shadow-lg">
          <div className="text-xs text-amber-200 font-serif">💕</div>
        </div>
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-amber-600 z-20 flex items-center justify-center shadow-lg">
          <div className="text-xs text-amber-200 font-serif">💐</div>
        </div>
        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-amber-600 z-20 flex items-center justify-center shadow-lg">
          <div className="text-xs text-amber-200 font-serif">🌹</div>
        </div>

        {/* Parchment Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'
          }}
        />

        {/* Rose Petal Particle Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
              }}
              animate={{
                y: [0, window.innerHeight * 1.2],
                x: [0, Math.sin(i * 3) * 50],
                rotate: [0, 360 * (i % 2 ? 1 : -1)],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            >
              🌹
            </motion.div>
          ))}
        </div>

        {/* Candlelight Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(217, 119, 6, 0.1) 50%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Romantic Header */}
        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center gap-3">
            {/* Wedding Rings Icon */}
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-600 flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-6 h-6 text-white" fill="white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-serif bg-gradient-to-r from-amber-800 via-rose-700 to-amber-800 bg-clip-text text-transparent flex items-center gap-2">
                💍 Our Love Story
              </CardTitle>
              <p className="text-sm text-rose-700 dark:text-rose-300 mt-1 font-serif italic">
                Cherished moments together
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

          {/* Elegant Calligraphy Border Around Buttons */}
          <div className="relative p-4 border-4 border-double border-amber-400 dark:border-amber-600 rounded-xl bg-gradient-to-br from-amber-50/50 to-rose-50/50 dark:from-amber-950/50 dark:to-rose-950/50">
            {/* Corner Ornaments */}
            <div className="absolute -top-2 -left-2 text-2xl">✿</div>
            <div className="absolute -top-2 -right-2 text-2xl">✿</div>
            <div className="absolute -bottom-2 -left-2 text-2xl">✿</div>
            <div className="absolute -bottom-2 -right-2 text-2xl">✿</div>

            {/* Golden Border Romantic Upload Buttons - ALL 4 */}
            <div className="grid grid-cols-2 gap-4">
              {/* Button 1: Upload Files */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
                onMouseEnter={addRosePetal}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    addRosePetal(e);
                    fileInputRef.current?.click();
                  }}
                  className="w-full h-24 bg-amber-300 md:bg-gradient-to-br md:from-amber-100 md:to-rose-200 dark:bg-amber-800 dark:md:from-amber-900 dark:md:to-rose-800 border-2 border-amber-500 dark:border-amber-600 hover:border-amber-600 hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                    <span className="text-3xl md:text-3xl">📸</span>
                    <span className="text-xs md:text-xs font-serif font-medium text-amber-900 dark:text-amber-100 leading-tight text-center px-1">Photos</span>
                  </div>
                  <div className="absolute top-2 right-2 text-2xl opacity-40">💕</div>
                </Button>
                
                {/* Animated rose petals on hover */}
                <AnimatePresence>
                  {rosePetals.map(petal => (
                    <motion.div
                      key={petal.id}
                      initial={{ opacity: 1, scale: 0, rotate: 0 }}
                      animate={{ 
                        opacity: 0, 
                        scale: 1.5, 
                        y: [0, -50, -100, -150],
                        x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 80],
                        rotate: [0, Math.random() * 360]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 3, ease: 'easeOut' }}
                      className="absolute pointer-events-none text-3xl"
                      style={{ left: petal.x, top: petal.y }}
                    >
                      🌹
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Button 2: Vault */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={addRosePetal}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onVaultClick()}
                  className="w-full h-24 bg-rose-300 md:bg-gradient-to-br md:from-rose-100 md:to-pink-200 dark:bg-rose-800 dark:md:from-rose-900 dark:md:to-pink-800 border-2 border-rose-500 dark:border-rose-600 hover:border-rose-600 hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                    <span className="text-3xl md:text-3xl">📁</span>
                    <span className="text-xs md:text-xs font-serif font-medium text-rose-900 dark:text-rose-100 leading-tight text-center px-1">Vault</span>
                  </div>
                  <div className="absolute top-2 right-2 text-2xl opacity-40">💖</div>
                </Button>
              </motion.div>

              {/* Button 3: Record/Camera */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={addRosePetal}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => isMobile ? onOpenMobileRecorder('photo') : onRecordClick()}
                  className="w-full h-24 bg-pink-300 md:bg-gradient-to-br md:from-pink-100 md:to-fuchsia-200 dark:bg-pink-800 dark:md:from-pink-900 dark:md:to-fuchsia-800 border-2 border-pink-500 dark:border-pink-600 hover:border-pink-600 hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                    <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                    <span className="text-xs md:text-xs font-serif font-medium text-pink-900 dark:text-pink-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
                  </div>
                  <div className="absolute top-2 right-2 text-2xl opacity-40">💗</div>
                </Button>
              </motion.div>

              {/* Button 4: Folder */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={addRosePetal}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onFolderClick()}
                  className="w-full h-24 bg-amber-300 md:bg-gradient-to-br md:from-amber-100 md:to-amber-200 dark:bg-amber-800 dark:md:from-amber-900 dark:md:to-amber-800 border-2 border-amber-500 dark:border-amber-600 hover:border-amber-600 hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                    <span className="text-3xl md:text-3xl">🗃️</span>
                    <span className="text-xs md:text-xs font-serif font-medium text-amber-900 dark:text-amber-100 leading-tight text-center px-1">Folder</span>
                  </div>
                  <div className="absolute top-2 right-2 text-2xl opacity-40">💝</div>
                </Button>
              </motion.div>
            </div>
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

          {/* Media Grid with Wedding Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Header with rose decoration */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-amber-300 dark:border-amber-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">💐</div>
                  <h3 className="text-lg font-serif bg-gradient-to-r from-amber-800 via-rose-700 to-amber-800 bg-clip-text text-transparent font-bold">
                    Our Gallery
                  </h3>
                  <Badge className="bg-rose-500 text-white">
                    {media.length}
                  </Badge>
                </div>
                <div className="text-sm text-amber-700 dark:text-amber-300 font-serif">
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
                      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900">
                        {index + 1}
                      </div>

                      {/* Media Thumbnail */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-2 border-amber-300 dark:border-amber-700 hover:border-rose-500 transition-all shadow-md hover:shadow-xl"
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

                      {/* Rose decoration on hover */}
                      <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        🌹
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Empty State with Wedding Theme */}
          {media.length === 0 && uploadQueue.files.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4"
            >
              <div className="text-6xl mb-4">💒</div>
              <p className="text-rose-900 dark:text-rose-100 font-serif font-medium mb-2">
                Begin your love story collection
              </p>
              <p className="text-sm text-rose-700 dark:text-rose-300 font-serif italic">
                Add cherished moments of your journey together
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}