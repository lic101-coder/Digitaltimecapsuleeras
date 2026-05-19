import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, ArrowRight, FolderPlus, X, Sparkles } from 'lucide-react';
import {
  FOLDER_TEMPLATES,
  TEMPLATE_CATEGORIES,
  FolderTemplate,
  getTemplatesByCategory,
  searchTemplates
} from '../utils/folder-templates';

interface FolderTemplateSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: FolderTemplate) => void;
}

export function FolderTemplateSelector({
  open,
  onOpenChange,
  onSelectTemplate
}: FolderTemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Debug: Log template count on open (MUST be before early return)
  useEffect(() => {
    if (open) {
      const allTemplates = Object.values(FOLDER_TEMPLATES);
      const allKeys = Object.keys(FOLDER_TEMPLATES);
      console.log('='.repeat(60));
      console.log('🎯 [TEMPLATE DEBUG] FOLDER_TEMPLATES object keys:', allKeys);
      console.log('🎯 [TEMPLATE DEBUG] Total unique keys:', allKeys.length);
      console.log('🎯 [TEMPLATE DEBUG] Total template objects:', allTemplates.length);
      console.log('🎯 [TEMPLATE DEBUG] Template IDs from values:', allTemplates.map(t => t.id));
      console.log('🎯 [TEMPLATE DEBUG] Are there duplicates?', allKeys.length !== new Set(allKeys).size);
      console.log('='.repeat(60));
    }
  }, [open]);

  if (!open) return null;

  const filteredTemplates = searchQuery
    ? searchTemplates(searchQuery)
    : selectedCategory === 'all'
    ? Object.values(FOLDER_TEMPLATES)
    : getTemplatesByCategory(selectedCategory);

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        isolation: 'isolate',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal Container - Fixed with proper scrolling */}
      <div
        className="relative w-full max-w-5xl animate-in zoom-in-95 fade-in duration-200"
        style={{ 
          maxHeight: 'calc(100vh - 2rem)',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Content */}
        <div className="flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-purple-500/40 shadow-2xl shadow-purple-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden" style={{ overflowX: 'hidden' }}>
          {/* Cosmic Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/15 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

          {/* Header - Fixed at top */}
          <div className="relative flex-shrink-0 p-8 pb-6 border-b border-purple-500/20">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-5">
                {/* Icon with enhanced cosmic styling */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40 blur-2xl rounded-2xl" />
                  <div className="relative p-5 rounded-2xl bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-pink-600/30 border-2 border-purple-400/40 shadow-xl backdrop-blur-sm">
                    <FolderPlus className="w-8 h-8 text-purple-200" strokeWidth={2.5} />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight mb-2">
                    Folder Templates
                  </h2>
                  <p className="text-base text-slate-400 flex items-center gap-2 flex-wrap">
                    Start organizing with pre-designed structures
                    <Badge variant="outline" className="text-xs border-purple-500/30 bg-purple-500/10 text-purple-300 font-semibold">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {Object.keys(FOLDER_TEMPLATES).length} templates
                    </Badge>
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => onOpenChange(false)}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600/50 text-slate-300 hover:text-white transition-all group shadow-lg"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-slate-800/80 border-2 border-slate-700/80 focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/20 text-white placeholder:text-slate-500 rounded-xl transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div 
            className="relative flex-1 overflow-y-auto overflow-x-hidden"
            style={{ 
              maxHeight: 'calc(100vh - 18rem)',
              overflowY: 'auto',
              overflowX: 'hidden',
              overscrollBehavior: 'contain'
            }}
          >
            <div className="p-8 pt-6">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid grid-cols-3 sm:grid-cols-6 bg-slate-800/60 border border-slate-700/50 mb-8 w-full overflow-hidden h-11 p-1">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 font-medium transition-all rounded-lg"
                  >
                    All
                  </TabsTrigger>
                  {TEMPLATE_CATEGORIES.map(cat => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 font-medium transition-all rounded-lg"
                    >
                      <span className="mr-1.5 text-base">{cat.icon}</span>
                      <span className="hidden sm:inline">{cat.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={selectedCategory} className="mt-0">
                  {filteredTemplates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
                        <div className="relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                          <FolderPlus className="w-12 h-12 opacity-50" />
                        </div>
                      </div>
                      <p className="text-lg font-medium text-slate-400 mb-1">No templates found</p>
                      <p className="text-sm text-slate-500">Try a different search term</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredTemplates.map(template => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          onSelect={() => {
                            onSelectTemplate(template);
                            onOpenChange(false);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render as portal to escape parent CSS
  return createPortal(modalContent, document.body);
}

interface TemplateCardProps {
  template: FolderTemplate;
  onSelect: () => void;
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-slate-800/80 to-slate-800/40 border-2 border-slate-700/60 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/30 rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 pt-5 px-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-xl rounded-xl" />
              <div className="relative text-3xl leading-none group-hover:scale-110 transition-transform duration-300">
                {template.icon}
              </div>
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-slate-100 group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {template.name}
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 font-medium">
                {template.folders.length} folders included
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold capitalize">
            {template.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 px-5 pb-5">
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
          {template.description}
        </p>

        {/* Folder Preview */}
        <div className="flex flex-wrap gap-2">
          {template.folders.slice(0, 4).map((folder, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-xs border-slate-600/80 bg-slate-800/60 text-slate-300 px-2.5 py-1 font-medium"
            >
              {folder.icon && <span className="mr-1.5 text-sm">{folder.icon}</span>}
              {folder.name}
            </Badge>
          ))}
          {template.folders.length > 4 && (
            <Badge variant="outline" className="text-xs border-slate-600/80 bg-slate-800/60 text-slate-400 px-2.5 py-1 font-medium">
              +{template.folders.length - 4} more
            </Badge>
          )}
        </div>

        <Button
          onClick={onSelect}
          className="w-full h-11 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/50 rounded-xl border-0"
          size="sm"
        >
          <span>Use Template</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
