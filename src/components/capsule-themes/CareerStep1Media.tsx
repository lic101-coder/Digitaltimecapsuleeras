/**
 * Career (Professional Milestone) Theme - Page 1: Add Media
 * Visual: Glass panel slide-ins, corporate HUD, achievement badges
 * Colors: Sleek blue/gray, modern sans-serif
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface CareerStep1MediaProps {
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

export function CareerStep1Media({
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
}: CareerStep1MediaProps) {
  const [badges, setBadges] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  // Add achievement badge on interaction
  const addBadge = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    
    setBadges(prev => [...prev, { id, x, y }]);
    
    setTimeout(() => {
      setBadges(prev => prev.filter(b => b.id !== id));
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Corporate Glass Panel Container */}
      <Card className="border-2 border-blue-400/50 dark:border-blue-700/50 shadow-2xl bg-gradient-to-br from-slate-100 via-blue-50 to-gray-100 dark:from-slate-950 dark:via-blue-950 dark:to-gray-950 relative overflow-hidden">
        {/* Glass/HUD Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .15) 25%, rgba(59, 130, 246, .15) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .15) 75%, rgba(59, 130, 246, .15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .15) 25%, rgba(59, 130, 246, .15) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .15) 75%, rgba(59, 130, 246, .15) 76%, transparent 77%, transparent)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Corporate HUD Interface Elements */}
        <div className="absolute top-4 right-4 z-20 space-y-1">
          <motion.div 
            className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/50 px-2 py-1 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            STATUS: RECORDING
          </motion.div>
          <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-900/50 px-2 py-1 rounded">
            LEVEL: PROFESSIONAL
          </div>
        </div>

        {/* Achievement Badge Unlocking Animations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {badges.map(badge => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1.3, 0],
                  rotate: [0, 360],
                  y: [0, -50]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute"
                style={{ 
                  left: badge.x, 
                  top: badge.y,
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-lg">
                  <span className="text-2xl">🏆</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Achievement Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`achieve-${i}`}
              className="absolute text-3xl opacity-30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {['💼', '📊', '🎯', '📈', '🏆', '⭐'][i]}
            </motion.div>
          ))}
        </div>

        {/* Professional Header */}
        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-slate-600 flex items-center justify-center shadow-lg"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 30px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-gray-700 bg-clip-text text-transparent flex items-center gap-2">
                💼 Career Milestones
              </CardTitle>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1 font-medium">
                Professional Achievement Archive
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

          {/* Glass Panel Slide-in Buttons - ALL 4 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Button 1: Upload Files */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addBadge}
              onClick={addBadge}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 bg-blue-300 md:bg-gradient-to-br md:from-blue-100 md:to-slate-200 dark:bg-blue-800 dark:md:from-blue-900 dark:md:to-slate-800 border-2 border-blue-400 dark:border-blue-600 hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden group"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-medium text-blue-900 dark:text-blue-100 leading-tight text-center px-1">Photos</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </motion.div>

            {/* Button 2: Vault */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addBadge}
              onClick={addBadge}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => onVaultClick()}
                className="w-full h-24 bg-slate-300 md:bg-gradient-to-br md:from-slate-100 md:to-gray-200 dark:bg-slate-800 dark:md:from-slate-900 dark:md:to-gray-800 border-2 border-slate-400 dark:border-slate-600 hover:border-slate-500 hover:shadow-xl transition-all relative overflow-hidden group"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-medium text-slate-900 dark:text-slate-100 leading-tight text-center px-1">Vault</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-400/0 via-slate-400/20 to-slate-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </motion.div>

            {/* Button 3: Record/Camera */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addBadge}
              onClick={addBadge}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => isMobile ? onOpenMobileRecorder('photo') : onRecordClick()}
                className="w-full h-24 bg-indigo-300 md:bg-gradient-to-br md:from-indigo-100 md:to-blue-200 dark:bg-indigo-800 dark:md:from-indigo-900 dark:md:to-blue-800 border-2 border-indigo-400 dark:border-indigo-600 hover:border-indigo-500 hover:shadow-xl transition-all relative overflow-hidden group"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-medium text-indigo-900 dark:text-indigo-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/20 to-indigo-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </motion.div>

            {/* Button 4: Folder */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addBadge}
              onClick={addBadge}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => onFolderClick()}
                className="w-full h-24 bg-cyan-300 md:bg-gradient-to-br md:from-cyan-100 md:to-blue-200 dark:bg-cyan-800 dark:md:from-cyan-900 dark:md:to-blue-800 border-2 border-cyan-400 dark:border-cyan-600 hover:border-cyan-500 hover:shadow-xl transition-all relative overflow-hidden group"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-medium text-cyan-900 dark:text-cyan-100 leading-tight text-center px-1">Folder</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
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

          {/* Media Grid with Professional Frame */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b-2 border-blue-300 dark:border-blue-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">💼</div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-gray-700 bg-clip-text text-transparent">
                    Achievement Gallery
                  </h3>
                  <Badge className="bg-blue-500 text-white">{media.length}</Badge>
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300 font-mono">
                  {formatFileSize(totalMediaSize)}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {media.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative group"
                    >
                      {/* Achievement Badge Number */}
                      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-br from-blue-500 to-slate-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900">
                        {index + 1}
                      </div>

                      {/* Glass panel border */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-2 border-blue-300/50 dark:border-blue-700/50 hover:border-blue-500 transition-all shadow-md hover:shadow-xl"
                        style={{ 
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 4px 6px rgba(59, 130, 246, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                        }}
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

                      {/* Achievement icon on hover */}
                      <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        🏆
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
              <div className="text-6xl mb-4">💼</div>
              <p className="text-blue-900 dark:text-blue-100 font-medium mb-2">
                Start your professional archive
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Document career milestones and achievements
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}