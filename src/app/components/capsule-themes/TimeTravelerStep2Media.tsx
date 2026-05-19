import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Upload, FolderUp, Video, Folder, Loader2, CheckSquare, X, Trash2, Image as ImageIcon, Film, FileAudio } from 'lucide-react';
import { UploadQueueManager } from '../UploadQueueManager';
import { MediaThumbnail } from '../MediaThumbnail';

interface TimeTravelerStep2MediaProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  folderInputRef: React.RefObject<HTMLInputElement>;
  uploadQueue: any;
  media: any[];
  isMultiSelectMode: boolean;
  selectedMediaIds: Set<string>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFolderClick: () => void;
  onRecordClick: () => void;
  onVaultClick: () => void;
  onToggleMultiSelect: () => void;
  onDeleteSelected: () => void;
  onSetSelectedMediaIds: (ids: Set<string>) => void;
  onDrop: (e: React.DragEvent) => void;
  themeId?: string;
  themeMetadata?: any;
}

export function TimeTravelerStep2Media({
  fileInputRef,
  folderInputRef,
  uploadQueue,
  media,
  isMultiSelectMode,
  selectedMediaIds,
  onFileSelect,
  onFolderClick,
  onRecordClick,
  onVaultClick,
  onToggleMultiSelect,
  onDeleteSelected,
  onSetSelectedMediaIds,
  onDrop,
  themeId,
  themeMetadata
}: TimeTravelerStep2MediaProps) {
  // 🔍 DEBUG: Log media prop to verify it's being passed correctly
  console.log('🎬 [TimeTravelerStep2Media] Received media:', {
    mediaCount: media?.length || 0,
    mediaItems: media?.map(m => ({
      id: m.id,
      type: m.type,
      fromVault: m.fromVault,
      url: m.url?.substring(0, 50),
      filename: m.filename || m.file?.name
    }))
  });

  // Helper function to handle media item selection
  const handleMediaClick = (mediaId: string) => {
    if (isMultiSelectMode) {
      const newSelectedIds = new Set(selectedMediaIds);
      if (newSelectedIds.has(mediaId)) {
        newSelectedIds.delete(mediaId);
      } else {
        newSelectedIds.add(mediaId);
      }
      onSetSelectedMediaIds(newSelectedIds);
    }
  };

  // Helper function to handle individual media removal
  const handleRemoveMedia = (mediaId: string) => {
    if (!isMultiSelectMode) {
      const newSelectedIds = new Set([mediaId]);
      onSetSelectedMediaIds(newSelectedIds);
      onDeleteSelected();
      onSetSelectedMediaIds(new Set());
    }
  };

  return (
    <Card className="border-2 shadow-2xl border-cyan-500/50 bg-black/90 backdrop-blur-md relative overflow-hidden">
      {/* Animated Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Scan Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)'
        }}
      />

      <CardHeader className="border-b relative z-10 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-500/30">
        <CardTitle className="flex items-center gap-3 text-white">
          <motion.div 
            className="p-2 bg-cyan-500/20 border border-cyan-400/50 rounded"
            animate={{ 
              boxShadow: [
                '0 0 10px rgba(34, 211, 238, 0.3)',
                '0 0 20px rgba(34, 211, 238, 0.6)',
                '0 0 10px rgba(34, 211, 238, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Upload className="h-5 w-5 text-cyan-400" />
          </motion.div>
          <div className="flex-1">
            <div className="font-mono text-cyan-400 tracking-wider">ATTACH_FILES</div>
            <div className="text-xs text-cyan-500/60 font-mono mt-0.5">media.storage.upload</div>
          </div>
        </CardTitle>
        <p className="text-sm mt-2 text-cyan-300/70 font-mono text-xs">
          [ OPTIONAL: Upload visual/audio data files ]
        </p>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4 relative z-10">
        {/* File & Folder Inputs */}
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
          // @ts-ignore
          directory=""
          multiple
          className="hidden"
          onChange={onFileSelect}
        />
        
        {/* Action Buttons Row */}
        <div className="grid grid-cols-4 gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()} 
            className="w-full justify-center bg-cyan-950/30 border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/50 font-mono"
          >
            <Upload className="h-4 w-4 mr-1.5" />
            UPLOAD
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onFolderClick}
            className="w-full justify-center bg-cyan-950/30 border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/50 font-mono"
          >
            <FolderUp className="h-4 w-4 mr-1.5" />
            FOLDER
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onRecordClick}
            className="w-full justify-center bg-cyan-950/30 border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/50 font-mono"
          >
            <Video className="h-4 w-4 mr-1.5" />
            RECORD
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onVaultClick}
            className="w-full justify-center bg-cyan-950/30 border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/50 font-mono"
          >
            <Folder className="h-4 w-4 mr-1.5" />
            VAULT
          </Button>
        </div>

        {/* Drag & Drop Zone */}
        <div
          className="border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-400/60 hover:bg-cyan-500/10 transition-all cursor-pointer relative overflow-hidden group"
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('!border-cyan-500', '!bg-cyan-500/20');
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove('!border-cyan-500', '!bg-cyan-500/20');
          }}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {/* Pulse effect on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)'
            }}
          />
          
          <Upload className="w-8 h-8 mx-auto mb-2 text-cyan-400/60" />
          <p className="text-sm text-cyan-300/70 font-mono font-medium mb-1">
            &gt; DROP_FILES_HERE
          </p>
          <p className="text-xs text-cyan-400/50 font-mono">
            [ or click to browse system ]
          </p>
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

        {/* Uploading status banner */}
        {media.some(m => m.uploading) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cyan-950/30 border border-cyan-500/30 rounded-lg p-3"
          >
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
              <span className="text-sm text-cyan-200 font-mono">
                UPLOADING {media.filter(m => m.uploading).length} FILE{media.filter(m => m.uploading).length > 1 ? 'S' : ''}...
              </span>
            </div>
          </motion.div>
        )}

        {/* Multi-select controls */}
        {media.length > 0 && (
          <div className="flex items-center justify-between pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onToggleMultiSelect}
              className="bg-cyan-950/30 border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/50 font-mono"
            >
              {isMultiSelectMode ? <X className="h-4 w-4 mr-1" /> : <CheckSquare className="h-4 w-4 mr-1" />}
              {isMultiSelectMode ? 'CANCEL' : 'SELECT'}
            </Button>

            {isMultiSelectMode && selectedMediaIds.size > 0 && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={onDeleteSelected}
                  className="bg-red-950/30 border-red-500/30 text-red-300 hover:bg-red-950/50 font-mono"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  DELETE ({selectedMediaIds.size})
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Media Grid - Render directly */}
        {media.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
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
                    {/* Selection overlay for multi-select mode */}
                    {isMultiSelectMode && (
                      <div
                        className={`absolute inset-0 z-20 rounded-lg border-4 transition-all cursor-pointer ${
                          selectedMediaIds.has(item.id)
                            ? 'border-cyan-400 bg-cyan-500/20'
                            : 'border-transparent hover:border-cyan-500/50'
                        }`}
                        onClick={() => handleMediaClick(item.id)}
                      >
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center">
                          {selectedMediaIds.has(item.id) && (
                            <CheckSquare className="h-4 w-4 text-cyan-400" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Index badge */}
                    <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-cyan-900 font-mono">
                      {index + 1}
                    </div>

                    {/* Media Thumbnail */}
                    <div
                      className="cursor-pointer rounded-lg overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-400 transition-all shadow-md hover:shadow-xl"
                    >
                      <MediaThumbnail
                        mediaFile={{
                          id: item.id,
                          file_name: item.file?.name || item.name || item.filename || 'unknown',
                          file_type: item.mimeType || item.type || item.file?.type || 'unknown',
                          url: item.url,
                          thumbnail: item.thumbnail,
                        }}
                        size="lg"
                        showOverlay={true}
                      />
                    </div>

                    {/* Action button - only show when NOT in multi-select mode */}
                    {!isMultiSelectMode && (
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveMedia(item.id);
                          }}
                          className="h-auto px-3 py-1.5 bg-red-500 hover:bg-red-600 shadow-lg flex items-center gap-1.5 text-white font-medium"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm">Delete</span>
                        </Button>
                      </div>
                    )}

                    {/* Tech decoration on hover */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="text-cyan-400 text-xs font-mono bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/50">
                        #{index + 1}
                      </div>
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
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-cyan-300 font-mono font-medium mb-2">
              [ NO_DATA_FILES_DETECTED ]
            </p>
            <p className="text-sm text-cyan-400/70 font-mono">
              &gt; Upload media to begin temporal archive
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}