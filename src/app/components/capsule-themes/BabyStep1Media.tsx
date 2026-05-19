import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FolderOpen, Video, Folder, Trash2, Download, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaThumbnail } from '../MediaThumbnail';
import { UploadQueueManager } from '../UploadQueueManager';

interface BabyStep1MediaProps {
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

export function BabyStep1Media({
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
  onDownloadMedia,
}: BabyStep1MediaProps) {
  return (
    <Card className="border-2 border-purple-300/40 bg-gradient-to-br from-purple-50/10 via-pink-50/10 to-blue-50/10 shadow-xl relative overflow-hidden">
      {/* Floating Stars Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 8}px`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
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

      {/* Soft Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(219, 39, 119, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(219, 39, 119, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <CardHeader className="border-b border-purple-300/20 bg-gradient-to-r from-purple-100/20 to-pink-100/20 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              🍼
            </motion.div>
            <div>
              <CardTitle className="text-purple-400 font-handwriting text-2xl">
                Baby's First Memories
              </CardTitle>
              <p className="text-xs text-purple-300/60 font-handwriting mt-0.5">
                Precious moments to treasure forever
              </p>
            </div>
          </div>

          {/* Baby Mobile Decoration */}
          <div className="flex gap-2">
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl"
            >
              🌙
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -10, 0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="text-2xl"
            >
              ⭐
            </motion.div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4 relative z-10">
        {/* Cloud-Bordered Container for Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 border-2 border-purple-300/30"
        >
          {/* Floating Clouds Decoration */}
          <div className="absolute -top-6 left-8 text-4xl opacity-60">☁️</div>
          <div className="absolute -top-4 right-16 text-3xl opacity-40">☁️</div>

          {/* Hidden File Inputs - MUST PRESERVE */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileSelect}
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            className="hidden"
          />
          <input
            type="file"
            ref={folderInputRef}
            onChange={onFileSelect}
            multiple
            // @ts-ignore - webkitdirectory is not in the types
            webkitdirectory=""
            className="hidden"
          />

          {/* ALL 4 BUTTONS - ALWAYS VISIBLE */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Button 1: FILES */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="relative bg-purple-500/30 md:bg-gradient-to-br md:from-purple-500/20 md:to-pink-500/20 border-2 border-purple-300/40 hover:border-purple-400 hover:bg-purple-500/40 text-purple-300 h-auto py-6 overflow-hidden group transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-purple-400/10"
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative flex flex-col items-center justify-center gap-1">
                <span className="text-2xl md:text-2xl">📸</span>
                <span className="text-xs md:text-xs font-handwriting leading-tight text-center px-1">Photos</span>
              </div>
            </Button>

            {/* Button 2: FOLDER */}
            <Button
              onClick={onFolderClick}
              variant="outline"
              className="relative bg-pink-500/30 md:bg-gradient-to-br md:from-pink-500/20 md:to-purple-500/20 border-2 border-pink-300/40 hover:border-pink-400 hover:bg-pink-500/40 text-pink-300 h-auto py-6 overflow-hidden group transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-pink-400/10"
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative flex flex-col items-center justify-center gap-1">
                <span className="text-2xl md:text-2xl">🗃️</span>
                <span className="text-xs md:text-xs font-handwriting leading-tight text-center px-1">Folder</span>
              </div>
            </Button>

            {/* Button 3: PHOTO/CAMERA or RECORD */}
            <Button
              onClick={isMobile ? () => onOpenMobileRecorder('photo') : onRecordClick}
              variant="outline"
              className="relative bg-blue-500/30 md:bg-gradient-to-br md:from-blue-500/20 md:to-purple-500/20 border-2 border-blue-300/40 hover:border-blue-400 hover:bg-blue-500/40 text-blue-300 h-auto py-6 overflow-hidden group transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-blue-400/10"
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative flex flex-col items-center justify-center gap-1">
                <span className="text-2xl md:text-2xl">{isMobile ? '📷' : '🎥'}</span>
                <span className="text-xs md:text-xs font-handwriting leading-tight text-center px-1">{isMobile ? 'Camera' : 'Record'}</span>
              </div>
            </Button>

            {/* Button 4: VAULT */}
            <Button
              onClick={onVaultClick}
              variant="outline"
              className="relative bg-purple-500/30 md:bg-gradient-to-br md:from-purple-500/20 md:to-blue-500/20 border-2 border-purple-300/40 hover:border-purple-400 hover:bg-purple-500/40 text-purple-300 h-auto py-6 overflow-hidden group transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-purple-400/10"
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative flex flex-col items-center justify-center gap-1">
                <span className="text-2xl md:text-2xl">📁</span>
                <span className="text-xs md:text-xs font-handwriting leading-tight text-center px-1">Vault</span>
              </div>
            </Button>
          </div>

          {/* Gentle Helper Text */}
          <p className="text-center text-xs text-purple-300/50 mt-3 font-handwriting">
            💝 Add precious photos, videos, and memories
          </p>
        </motion.div>

        {/* Upload Queue Manager */}
        {uploadQueue.files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <UploadQueueManager
              files={uploadQueue.files}
              onRemove={uploadQueue.removeFile}
              onPause={uploadQueue.pauseFile}
              onResume={uploadQueue.resumeFile}
              onRetry={uploadQueue.retryFile}
              onClearCompleted={uploadQueue.clearCompleted}
              onClearAll={uploadQueue.clearAll}
            />
          </motion.div>
        )}

        {/* Media Grid */}
        {media.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-handwriting text-purple-300">
                💕 Treasured Memories:
              </p>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-400/30 font-handwriting">
                {media.length} {media.length === 1 ? 'memory' : 'memories'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <AnimatePresence mode="popLayout">
                {media.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group"
                  >
                    {/* Memory number badge */}
                    <div className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white/80 flex items-center justify-center shadow-lg">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>

                    <MediaThumbnail
                      mediaFile={{
                        id: item.id,
                        file_name: item.file?.name,
                        file_type: item.mimeType,
                        url: item.url,
                        thumbnail: item.thumbnail,
                      }}
                      size="lg"
                      onClick={() => onPreviewMedia(item)}
                    />

                    {/* Delete button overlay */}
                    <div className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-auto px-3 py-1.5 bg-red-500 hover:bg-red-600 shadow-lg flex items-center gap-1.5 text-white font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveMedia(item.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="text-sm">Delete</span>
                      </Button>
                    </div>

                    {/* Download button if provided */}
                    {onDownloadMedia && (
                      <div className="absolute top-2 right-12 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-blue-500/90 hover:bg-blue-600 shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDownloadMedia(item);
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
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
            className="text-center py-16 border-2 border-dashed border-purple-300/30 rounded-3xl bg-purple-500/5 relative overflow-hidden"
          >
            {/* Gentle clouds in background */}
            <div className="absolute top-4 left-8 text-5xl opacity-20">☁️</div>
            <div className="absolute bottom-6 right-12 text-4xl opacity-20">☁️</div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              👶
            </motion.div>
            <p className="text-purple-300/60 font-handwriting text-lg">
              No memories yet...
            </p>
            <p className="text-purple-400/40 text-sm mt-2 font-handwriting">
              Start adding precious moments
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}