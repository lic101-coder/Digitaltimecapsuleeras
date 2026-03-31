/**
 * First Day (School/Job) Theme - Page 1: Add Media
 * Visual: School locker, notebook paper, pencil doodles, stickers
 * Colors: Orange/yellow with school icons
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface FirstDayStep1MediaProps {
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

export function FirstDayStep1Media({
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
}: FirstDayStep1MediaProps) {
  const [doodles, setDoodles] = useState<Array<{ id: number; x: number; y: number; icon: string }>>([]);
  
  // Add doodle on interaction
  const addDoodle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    const icons = ['✏️', '📝', '⭐', '🎨', '📐', '✂️'];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    
    setDoodles(prev => [...prev, { id, x, y, icon }]);
    
    setTimeout(() => {
      setDoodles(prev => prev.filter(d => d.id !== id));
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* School Locker Container */}
      <Card className="border-4 border-orange-400 dark:border-orange-700 shadow-2xl bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-yellow-950 dark:via-orange-950 dark:to-amber-950 relative overflow-hidden">
        {/* Notebook Paper Lined Background */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(249, 115, 22, 0.3) 31px, rgba(249, 115, 22, 0.3) 32px)',
          }}
        />
        
        {/* Red margin line */}
        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-red-400 opacity-40 pointer-events-none" />

        {/* Pencil/Crayon Doodles in Corners */}
        <div className="absolute top-4 left-4 text-3xl opacity-60 pointer-events-none rotate-12">✏️</div>
        <div className="absolute top-4 right-4 text-3xl opacity-60 pointer-events-none -rotate-12">📝</div>
        <div className="absolute bottom-4 left-4 text-3xl opacity-60 pointer-events-none -rotate-12">🎨</div>
        <div className="absolute bottom-4 right-4 text-3xl opacity-60 pointer-events-none rotate-12">✂️</div>

        {/* Interactive Doodles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {doodles.map(doodle => (
              <motion.div
                key={doodle.id}
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0.8],
                  rotate: [0, 360],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute text-3xl"
                style={{ 
                  left: doodle.x, 
                  top: doodle.y,
                }}
              >
                {doodle.icon}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating School Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`school-${i}`}
              className="absolute text-3xl opacity-20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {['📚', '✏️', '📐', '🎒', '🔔', '⭐', '📝', '🎨'][i]}
            </motion.div>
          ))}
        </div>

        {/* Gold Star Decorations */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-4xl pointer-events-none"
            style={{
              left: `${15 + i * 18}%`,
              top: '8%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ⭐
          </motion.div>
        ))}

        {/* School Bell Header */}
        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [-5, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Bell className="w-6 h-6 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent flex items-center gap-2">
                📓 First Day Memories
              </CardTitle>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1 font-medium">
                Start your new chapter
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

          {/* School Locker Opening Buttons - ALL 4 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Button 1: Upload Files */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ transformOrigin: 'top' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addDoodle}
              onClick={addDoodle}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 bg-blue-300 md:bg-gradient-to-br md:from-blue-100 md:to-sky-200 dark:bg-blue-800 dark:md:from-blue-900 dark:md:to-sky-800 border-2 border-blue-400 dark:border-blue-600 hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📸</span>
                  <span className="text-xs md:text-xs font-medium text-blue-900 dark:text-blue-100 leading-tight text-center px-1">Photos</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">⭐</div>
              </Button>
            </motion.div>

            {/* Button 2: Vault */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ transformOrigin: 'top' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addDoodle}
              onClick={addDoodle}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => onVaultClick()}
                className="w-full h-24 bg-yellow-300 md:bg-gradient-to-br md:from-yellow-100 md:to-amber-200 dark:bg-yellow-800 dark:md:from-yellow-900 dark:md:to-amber-800 border-2 border-yellow-400 dark:border-yellow-600 hover:border-yellow-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">📁</span>
                  <span className="text-xs md:text-xs font-medium text-yellow-900 dark:text-yellow-100 leading-tight text-center px-1">Vault</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">📚</div>
              </Button>
            </motion.div>

            {/* Button 3: Record/Camera */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addDoodle}
              onClick={addDoodle}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => isMobile ? onOpenMobileRecorder('photo') : onRecordClick()}
                className="w-full h-24 bg-green-300 md:bg-gradient-to-br md:from-green-100 md:to-emerald-200 dark:bg-green-800 dark:md:from-green-900 dark:md:to-emerald-800 border-2 border-green-400 dark:border-green-600 hover:border-green-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">{isMobile ? '📷' : '🎥'}</span>
                  <span className="text-xs md:text-xs font-medium text-green-900 dark:text-green-100 leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">✏️</div>
              </Button>
            </motion.div>

            {/* Button 4: Folder */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ transformOrigin: 'top' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={addDoodle}
              onClick={addDoodle}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => onFolderClick()}
                className="w-full h-24 bg-purple-300 md:bg-gradient-to-br md:from-purple-100 md:to-violet-200 dark:bg-purple-800 dark:md:from-purple-900 dark:md:to-violet-800 border-2 border-purple-400 dark:border-purple-600 hover:border-purple-500 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex flex-col items-center justify-center gap-1 z-10 relative">
                  <span className="text-3xl md:text-3xl">🗃️</span>
                  <span className="text-xs md:text-xs font-medium text-purple-900 dark:text-purple-100 leading-tight text-center px-1">Folder</span>
                </div>
                <div className="absolute top-2 right-2 text-2xl opacity-40">🎒</div>
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

          {/* Media Grid with Notebook Styling */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b-2 border-orange-300 dark:border-orange-700">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">📓</div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                    Memory Gallery
                  </h3>
                  <Badge className="bg-orange-500 text-white">{media.length}</Badge>
                </div>
                <div className="text-sm text-orange-700 dark:text-orange-300">
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
                      {/* Gold star number */}
                      <div className="absolute -top-2 -left-2 z-10 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900">
                        {index + 1}
                      </div>

                      {/* Notebook border */}
                      <div
                        onClick={() => onPreviewMedia(item)}
                        className="cursor-pointer rounded-lg overflow-hidden border-4 border-orange-300 dark:border-orange-700 hover:border-orange-500 transition-all shadow-md hover:shadow-xl"
                        style={{ boxShadow: '0 4px 6px rgba(249, 115, 22, 0.1), 0 2px 4px rgba(249, 115, 22, 0.06)' }}
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

                      {/* Gold star on hover */}
                      <div className="absolute top-2 right-2 text-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        ⭐
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
              <div className="text-6xl mb-4">🎒</div>
              <p className="text-orange-900 dark:text-orange-100 font-medium mb-2">
                Ready for your first day?
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Capture memories from your new beginning
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}