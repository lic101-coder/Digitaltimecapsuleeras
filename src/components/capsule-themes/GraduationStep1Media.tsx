/**
 * Graduation (Achievement) Theme - Page 1: Add Media
 * Visual: Diploma scroll unfurling with cap toss confetti and trophy shine
 * Colors: School blue/gold with achievement icons
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface GraduationStep1MediaProps {
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

export function GraduationStep1Media({
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
}: GraduationStep1MediaProps) {
  const [capToss, setCapToss] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [scrollUnfurled, setScrollUnfurled] = useState(false);
  
  // Generate cap toss confetti on button interaction
  const addCapToss = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setCapToss(prev => [...prev, { id, x, y }]);
    
    // Remove confetti after animation
    setTimeout(() => {
      setCapToss(prev => prev.filter(p => p.id !== id));
    }, 3000);
  };

  // Unfurl scroll on mount
  React.useEffect(() => {
    const timer = setTimeout(() => setScrollUnfurled(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Diploma Scroll Unfurling Border */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: scrollUnfurled ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ transformOrigin: 'top' }}
      >
        {/* Scroll Paper Edges */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-100 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-100 to-transparent opacity-50" />
        
        {/* Ribbon on top */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-blue-600 to-blue-800 rounded-t-lg shadow-lg" />
      </motion.div>

      {/* Achievement Card Container */}
      <Card className="border-blue-400 dark:border-blue-700 shadow-2xl bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 dark:from-blue-950 dark:via-slate-950 dark:to-blue-900 relative overflow-hidden">
        {/* Diploma Border Pattern */}
        <div className="absolute inset-0 pointer-events-none border-8 border-double border-amber-300 dark:border-amber-700 opacity-30" />
        
        {/* Trophy Shine Effects */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${10 + i * 12}%`,
                top: i % 2 === 0 ? '15%' : '75%',
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              🏆
            </motion.div>
          ))}
        </div>

        {/* Floating Stars/Achievement Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {['⭐', '🌟', '✨', '🎯', '🏅', '📜'][i]}
            </motion.div>
          ))}
        </div>

        {/* Trophy Header */}
        <CardHeader className="relative pb-4">
          <div className="flex items-center gap-3">
            {/* Spinning Trophy Icon */}
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg"
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Trophy className="w-6 h-6 text-white" fill="white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                🎓 Achievement Collection
              </CardTitle>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Document your journey to success
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

          {/* Achievement Upload Buttons - ALL 4 IN SCHOOL COLORS */}
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
                  addCapToss(e);
                  fileInputRef.current?.click();
                }}
                className="w-full h-24 bg-blue-300 md:bg-gradient-to-br md:from-blue-100 md:to-sky-100 dark:bg-blue-800 dark:md:from-blue-900 dark:md:to-sky-900 border-2 border-blue-400 dark:border-blue-600 hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-bold text-blue-900 dark:text-blue-100 leading-tight text-center px-1">Photos</span>
                </div>
              </Button>
              
              {/* Animated cap toss confetti on click */}
              <AnimatePresence>
                {capToss.map(conf => (
                  <motion.div
                    key={conf.id}
                    initial={{ opacity: 1, scale: 0, rotate: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: 1.5, 
                      y: -120,
                      x: (Math.random() - 0.5) * 100,
                      rotate: Math.random() * 720
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, ease: 'easeOut' }}
                    className="absolute pointer-events-none text-3xl"
                    style={{ left: conf.x, top: conf.y }}
                  >
                    🎓
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
                  addCapToss(e);
                  onVaultClick();
                }}
                className="w-full h-24 bg-amber-300 md:bg-gradient-to-br md:from-amber-100 md:to-yellow-100 dark:bg-amber-800 dark:md:from-amber-900 dark:md:to-yellow-900 border-2 border-amber-400 dark:border-amber-600 hover:border-amber-500 hover:shadow-xl transition-all relative overflow-hidden group"
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
                  addCapToss(e);
                  isMobile ? onOpenMobileRecorder('photo') : onRecordClick();
                }}
                className="w-full h-24 bg-green-300 md:bg-gradient-to-br md:from-green-100 md:to-emerald-100 dark:bg-green-800 dark:md:from-green-900 dark:md:to-emerald-900 border-2 border-green-400 dark:border-green-600 hover:border-green-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-bold text-green-900 dark:text-green-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
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
                  addCapToss(e);
                  onFolderClick();
                }}
                className="w-full h-24 bg-blue-300 md:bg-gradient-to-br md:from-blue-100 md:to-indigo-100 dark:bg-blue-800 dark:md:from-blue-900 dark:md:to-indigo-900 border-2 border-blue-400 dark:border-blue-600 hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-bold text-blue-900 dark:text-blue-100 leading-tight text-center px-1">Folder</span>
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

          {/* Media Grid with Achievement Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Header with trophy decoration */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-blue-300 dark:border-blue-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🏆</div>
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    Achievement Gallery
                  </h3>
                  <Badge className="bg-blue-500 text-white">
                    {media.length}
                  </Badge>
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
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
                      {/* Medal badge number */}
                      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-blue-900">
                        {index + 1}
                      </div>

                      {/* Media Thumbnail */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-2 border-blue-300 dark:border-blue-700 hover:border-blue-500 transition-all shadow-md hover:shadow-xl"
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

                      {/* Star decoration on hover */}
                      <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        ⭐
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Empty State with Achievement Theme */}
          {media.length === 0 && uploadQueue.files.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4"
            >
              <div className="text-6xl mb-4">🎓</div>
              <p className="text-blue-900 dark:text-blue-100 font-medium mb-2">
                Start building your achievement collection
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Add photos, videos, or moments from your success journey
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}