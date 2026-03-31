/**
 * Pet (Beloved Companion) Theme - Page 1: Add Media
 * Visual: Pet treasure box opening with paw prints and collar tags
 * Colors: Warm brown/orange with pet-themed decorations
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface PetStep1MediaProps {
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

export function PetStep1Media({
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
}: PetStep1MediaProps) {
  const [pawPrints, setPawPrints] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  // Generate paw print on button interaction
  const addPawPrint = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setPawPrints(prev => [...prev, { id, x, y }]);
    
    // Remove paw print after animation
    setTimeout(() => {
      setPawPrints(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Pet Treasure Box Container */}
      <Card className="border-amber-200 shadow-xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-950 dark:via-orange-950 dark:to-amber-900 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {/* Paw print pattern */}
          <div className="absolute top-4 left-4 text-6xl">🐾</div>
          <div className="absolute top-12 right-8 text-5xl rotate-45">🐾</div>
          <div className="absolute bottom-8 left-12 text-5xl -rotate-12">🐾</div>
          <div className="absolute bottom-4 right-4 text-6xl rotate-12">🐾</div>
        </div>

        {/* Collar Tag Header */}
        <CardHeader className="relative pb-4">
          <div className="flex items-center gap-3">
            {/* Pet Collar Tag Icon */}
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.05, 1]
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
              <CardTitle className="text-2xl font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                🐾 Pet Memory Treasure Box
              </CardTitle>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Preserve precious moments with your beloved companion
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

          {/* Pet Upload Buttons - ALL 4 */}
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
                  addPawPrint(e);
                  fileInputRef.current?.click();
                }}
                className="w-full h-24 bg-amber-300 md:bg-gradient-to-br md:from-amber-100 md:to-yellow-100 dark:bg-amber-800 dark:md:from-amber-900 dark:md:to-yellow-900 border-2 border-amber-300 dark:border-amber-700 hover:border-amber-400 hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-bold text-amber-900 dark:text-amber-100 leading-tight text-center px-1">Photos</span>
                </div>
              </Button>
              
              {/* Animated paw prints on click */}
              <AnimatePresence>
                {pawPrints.map(print => (
                  <motion.div
                    key={print.id}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ opacity: 0, scale: 2, y: -50 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute pointer-events-none text-2xl"
                    style={{ left: print.x, top: print.y }}
                  >
                    🐾
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
                  addPawPrint(e);
                  onVaultClick();
                }}
                className="w-full h-24 bg-orange-300 md:bg-gradient-to-br md:from-orange-100 md:to-amber-100 dark:bg-orange-800 dark:md:from-orange-900 dark:md:to-amber-900 border-2 border-orange-300 dark:border-orange-700 hover:border-orange-400 hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-bold text-amber-900 dark:text-amber-100 leading-tight text-center px-1">Vault</span>
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
                  addPawPrint(e);
                  isMobile ? onOpenMobileRecorder('photo') : onRecordClick();
                }}
                className="w-full h-24 bg-yellow-300 md:bg-gradient-to-br md:from-yellow-100 md:to-amber-100 dark:bg-yellow-800 dark:md:from-yellow-900 dark:md:to-amber-900 border-2 border-yellow-300 dark:border-yellow-700 hover:border-yellow-400 hover:shadow-lg transition-all relative overflow-hidden group"
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
                  addPawPrint(e);
                  onFolderClick();
                }}
                className="w-full h-24 bg-amber-300 md:bg-gradient-to-br md:from-amber-100 md:to-orange-100 dark:bg-amber-800 dark:md:from-amber-900 dark:md:to-orange-900 border-2 border-amber-300 dark:border-amber-700 hover:border-amber-400 hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-bold text-amber-900 dark:text-amber-100 leading-tight text-center px-1">Folder</span>
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

          {/* Media Grid with Pet-Themed Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Header with collar bell decoration */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">💝</div>
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">
                    Treasured Memories
                  </h3>
                  <Badge className="bg-amber-500 text-white">
                    {media.length}
                  </Badge>
                </div>
                <div className="text-sm text-amber-700 dark:text-amber-300">
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
                      {/* Pet collar tag number */}
                      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-amber-900">
                        {index + 1}
                      </div>

                      {/* Media Thumbnail */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 transition-all shadow-md hover:shadow-xl"
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

          {/* Empty State with Pet Theme */}
          {media.length === 0 && uploadQueue.files.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4"
            >
              <div className="text-6xl mb-4">🐾</div>
              <p className="text-amber-900 dark:text-amber-100 font-medium mb-2">
                Start filling your pet's treasure box
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Add photos, videos, or memories of your beloved companion
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}