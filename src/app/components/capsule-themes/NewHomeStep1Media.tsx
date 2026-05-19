/**
 * New Home (Moving In) Theme - Page 1: Add Media
 * Visual: Moving boxes, door key turning, welcome mat, blueprint background
 * Colors: Warm browns, blues, welcoming tones
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface NewHomeStep1MediaProps {
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

export function NewHomeStep1Media({
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
}: NewHomeStep1MediaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Housewarming Card Container */}
      <Card className="border-4 border-blue-400 dark:border-blue-700 shadow-2xl bg-gradient-to-br from-blue-50 via-slate-50 to-amber-50 dark:from-blue-950 dark:via-slate-950 dark:to-amber-900 relative overflow-hidden">
        {/* House Blueprint Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .1) 25%, rgba(59, 130, 246, .1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .1) 75%, rgba(59, 130, 246, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .1) 25%, rgba(59, 130, 246, .1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .1) 75%, rgba(59, 130, 246, .1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} />

        {/* Door Key Turning Visual */}
        <motion.div className="absolute top-4 right-4 z-20" animate={{ rotate: [0, 90, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
          <div className="text-5xl">🔑</div>
        </motion.div>

        {/* Welcome Mat Corner */}
        <div className="absolute bottom-4 left-4 w-24 h-16 bg-gradient-to-br from-red-800 to-red-900 border-2 border-amber-600 rounded flex items-center justify-center z-20 shadow-lg">
          <div className="text-xs text-amber-200 font-bold">WELCOME</div>
        </div>

        {/* Moving Box Unpacking Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
          {[...Array(8)].map((_, i) => (
            <motion.div key={`box-${i}`} className="absolute text-4xl" style={{ left: `${10 + i * 12}%`, bottom: '-10%' }} animate={{ y: [0, -100, -100, 0], rotate: [0, 5, -5, 0], opacity: [0, 1, 1, 0] }} transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, repeatDelay: 3 }}>
              📦
            </motion.div>
          ))}
        </div>

        {/* Floating Keys */}
        <div className="absolute inset-0 pointer-events-none will-change-transform">
          {[...Array(6)].map((_, i) => (
            <motion.div key={`key-${i}`} className="absolute text-3xl" style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }} animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}>
              🗝️
            </motion.div>
          ))}
        </div>

        {/* Housewarming Header */}
        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center gap-3">
            <motion.div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-slate-600 flex items-center justify-center shadow-lg" animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <Home className="w-6 h-6 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
                🏠 New Home Memories
              </CardTitle>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Fresh starts and new chapters
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

          {/* Welcome Mat Upload Buttons - ALL 4 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Button 1: Upload Files */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full h-24 bg-blue-300 md:bg-gradient-to-br md:from-blue-100 md:to-sky-200 dark:bg-blue-800 dark:md:from-blue-900 dark:md:to-sky-800 border-2 border-blue-400 dark:border-blue-600 hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-medium text-blue-900 dark:text-blue-100 leading-tight text-center px-1">Photos</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🔑</div>
              </Button>
            </motion.div>

            {/* Button 2: Vault */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="button" variant="outline" onClick={() => onVaultClick()} className="w-full h-24 bg-slate-300 md:bg-gradient-to-br md:from-slate-100 md:to-gray-200 dark:bg-slate-800 dark:md:from-slate-900 dark:md:to-gray-800 border-2 border-slate-400 dark:border-slate-600 hover:border-slate-500 hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-medium text-slate-900 dark:text-slate-100 leading-tight text-center px-1">Vault</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">📦</div>
              </Button>
            </motion.div>

            {/* Button 3: Record/Camera */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="button" variant="outline" onClick={() => isMobile ? onOpenMobileRecorder('photo') : onRecordClick()} className="w-full h-24 bg-amber-300 md:bg-gradient-to-br md:from-amber-100 md:to-yellow-200 dark:bg-amber-800 dark:md:from-amber-900 dark:md:to-yellow-800 border-2 border-amber-400 dark:border-amber-600 hover:border-amber-500 hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-medium text-amber-900 dark:text-amber-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🏠</div>
              </Button>
            </motion.div>

            {/* Button 4: Folder */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="button" variant="outline" onClick={() => onFolderClick()} className="w-full h-24 bg-green-300 md:bg-gradient-to-br md:from-green-100 md:to-emerald-200 dark:bg-green-800 dark:md:from-green-900 dark:md:to-emerald-800 border-2 border-green-400 dark:border-green-600 hover:border-green-500 hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-medium text-green-900 dark:text-green-100 leading-tight text-center px-1">Folder</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🌱</div>
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

          {/* Media Grid with Picture Frame Borders */}
          {media.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-blue-300 dark:border-blue-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🏠</div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-amber-600 bg-clip-text text-transparent">
                    Home Gallery
                  </h3>
                  <Badge className="bg-blue-500 text-white">{media.length}</Badge>
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  {formatFileSize(totalMediaSize)}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {media.map((item, index) => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }} className="relative group">
                      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-br from-blue-500 to-slate-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900">
                        {index + 1}
                      </div>

                      <div onClick={() => onPreviewMedia(item)} className="cursor-pointer rounded-lg overflow-hidden border-4 border-amber-300 dark:border-amber-700 hover:border-blue-500 transition-all shadow-md hover:shadow-xl" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1), inset 0 0 0 8px rgba(217, 119, 6, 0.1)' }}>
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

                      <div className="absolute bottom-2 right-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
                        {onDownloadMedia && (
                          <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); onDownloadMedia(item); }} className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={(e) => { e.stopPropagation(); onRemoveMedia(item.id); }} 
                          className="h-auto px-3 py-1.5 bg-red-500 hover:bg-red-600 shadow-lg flex items-center gap-1.5 text-white font-medium"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm">Delete</span>
                        </Button>
                      </div>

                      <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">🔑</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {media.length === 0 && uploadQueue.files.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 px-4">
              <div className="text-6xl mb-4">🏡</div>
              <p className="text-blue-900 dark:text-blue-100 font-medium mb-2">
                Start your new home collection
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Add memories from your fresh start and new chapter
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}