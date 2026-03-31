/**
 * Travel (Adventure) Theme - Page 1: Add Media
 * Visual: Vintage suitcase, passport stamps, map with pins, travel journal
 * Colors: Leather brown/orange with travel icons
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface TravelStep1MediaProps {
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

export function TravelStep1Media({
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
}: TravelStep1MediaProps) {
  const [stamps, setStamps] = useState<Array<{ id: number; x: number; y: number; rotation: number }>>([]);
  
  // Add passport stamp on interaction
  const addStamp = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    const rotation = Math.random() * 30 - 15;
    
    setStamps(prev => [...prev, { id, x, y, rotation }]);
    
    setTimeout(() => {
      setStamps(prev => prev.filter(s => s.id !== id));
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Vintage Suitcase Container */}
      <Card className="border-4 border-amber-700 dark:border-amber-900 shadow-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-900 relative overflow-hidden">
        {/* Leather Texture Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)',
          }}
        />

        {/* Map with Pin Drops */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139, 69, 19, 0.3) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        </div>

        {/* Vintage Suitcase Corners/Latches */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-800 border-2 border-amber-900 z-20 rounded" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }} />
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-800 border-2 border-amber-900 z-20 rounded" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-800 border-2 border-amber-900 z-20 rounded" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-800 border-2 border-amber-900 z-20 rounded" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }} />

        {/* Floating Planes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`plane-${i}`}
              className="absolute text-3xl"
              style={{
                left: `-10%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                x: ['0vw', '110vw'],
                y: [0, Math.sin(i * 2) * 30],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 3,
              }}
            >
              ✈️
            </motion.div>
          ))}
        </div>

        {/* Passport Stamp Effects on Hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {stamps.map(stamp => (
              <motion.div
                key={stamp.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.8], scale: [0, 1.2, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute text-4xl"
                style={{ 
                  left: stamp.x, 
                  top: stamp.y,
                  transform: `rotate(${stamp.rotation}deg)`,
                }}
              >
                🛂
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Travel Journal Header */}
        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-700 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Plane className="w-6 h-6 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-700 bg-clip-text text-transparent flex items-center gap-2">
                ✈️ Adventure Memories
              </CardTitle>
              <p className="text-sm text-amber-800 dark:text-amber-300 mt-1 italic">
                Collect your journey
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

          {/* Travel Upload Buttons - ALL 4 in Suitcase Style */}
          <div className="grid grid-cols-2 gap-4">
            {/* Button 1: Upload Files */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addStamp}
              onClick={addStamp}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 bg-amber-300 md:bg-gradient-to-br md:from-amber-200 md:to-orange-300 dark:bg-amber-800 dark:md:from-amber-900 dark:md:to-orange-800 border-2 border-amber-600 dark:border-amber-700 hover:border-amber-700 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-medium text-amber-900 dark:text-amber-100 leading-tight text-center px-1">Photos</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🗺️</div>
              </Button>
            </motion.div>

            {/* Button 2: Vault */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addStamp}
              onClick={addStamp}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => onVaultClick()}
                className="w-full h-24 bg-orange-300 md:bg-gradient-to-br md:from-orange-200 md:to-yellow-300 dark:bg-orange-800 dark:md:from-orange-900 dark:md:to-yellow-800 border-2 border-orange-600 dark:border-orange-700 hover:border-orange-700 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-medium text-orange-900 dark:text-orange-100 leading-tight text-center px-1">Vault</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🧳</div>
              </Button>
            </motion.div>

            {/* Button 3: Record/Camera */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addStamp}
              onClick={addStamp}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => isMobile ? onOpenMobileRecorder('photo') : onRecordClick()}
                className="w-full h-24 bg-yellow-300 md:bg-gradient-to-br md:from-yellow-200 md:to-amber-300 dark:bg-yellow-800 dark:md:from-yellow-900 dark:md:to-amber-800 border-2 border-yellow-600 dark:border-yellow-700 hover:border-yellow-700 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-medium text-yellow-900 dark:text-yellow-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🌍</div>
              </Button>
            </motion.div>

            {/* Button 4: Folder */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addStamp}
              onClick={addStamp}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => onFolderClick()}
                className="w-full h-24 bg-amber-300 md:bg-gradient-to-br md:from-amber-200 md:to-amber-300 dark:bg-amber-800 dark:md:from-amber-900 dark:md:to-amber-800 border-2 border-amber-600 dark:border-amber-700 hover:border-amber-700 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-medium text-amber-900 dark:text-amber-100 leading-tight text-center px-1">Folder</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🛂</div>
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

          {/* Media Grid with Postcard Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b-2 border-amber-400 dark:border-amber-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🗺️</div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-700 bg-clip-text text-transparent">
                    Travel Gallery
                  </h3>
                  <Badge className="bg-orange-500 text-white">{media.length}</Badge>
                </div>
                <div className="text-sm text-amber-800 dark:text-amber-300">
                  {formatFileSize(totalMediaSize)}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {media.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="relative group"
                    >
                      {/* Postcard stamp number */}
                      <div className="absolute -top-2 -left-2 z-10 w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-sm flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900 transform rotate-12">
                        {index + 1}
                      </div>

                      {/* Postcard border */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-4 border-amber-400 dark:border-amber-700 hover:border-orange-500 transition-all shadow-md hover:shadow-xl"
                        style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)' }}
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

                      {/* Passport stamp on hover */}
                      <div className="absolute top-2 right-2 text-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform rotate-12">
                        🛂
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
              <div className="text-6xl mb-4">🧳</div>
              <p className="text-amber-900 dark:text-amber-100 font-medium mb-2">
                Start your adventure collection
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Add memories from your travels around the world
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}