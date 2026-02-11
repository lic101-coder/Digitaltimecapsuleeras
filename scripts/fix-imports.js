import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const projectRoot = '/vercel/share/v0-project';

// All files that need fixing (from grep results)
const files = [
  'src/App.tsx',
  'src/utils/timezone.tsx',
  'src/utils/supabase/database.tsx',
  'src/pages/RequestVerification.tsx',
  'src/hooks/useAuth.tsx',
  'src/hooks/useOfflineSync.tsx',
  'src/hooks/useAchievements.tsx',
  'src/components/AIEditor.tsx',
  'src/components/DeliveryStatus.tsx',
  'src/components/EmailVerification.tsx',
  'src/components/Dashboard.tsx',
  'src/components/EmailDebugPanel.tsx',
  'src/components/EditDeliveryTime.tsx',
  'src/components/CreateCapsule.tsx',
  'src/components/EchoTimeline.tsx',
  'src/components/CommentReactions.tsx',
  'src/components/CleanupHiddenCapsules.tsx',
  'src/components/EchoSocialTimeline.tsx',
  'src/components/EchoPanel.tsx',
  'src/components/CapsuleMilestoneShare.tsx',
  'src/components/CapsuleDetailModal.tsx',
  'src/components/CapsuleCard.tsx',
  'src/components/MemoryFeed.tsx',
  'src/components/CalendarView.tsx',
  'src/components/MediaPreviewModal.tsx',
  'src/components/BackendDebug.tsx',
  'src/components/Auth.tsx',
  'src/components/MediaEnhancementOverlay.tsx',
  'src/components/LegacyVault.tsx',
  'src/components/AchievementUnlockModal.tsx',
  'src/components/LegacyAccessBeneficiaries.tsx',
  'src/components/FolderSelector.tsx',
  'src/components/FolderLegacyAccessModal.tsx',
  'src/components/HelpSupportModal.tsx',
  'src/components/GoogleOAuthSetupGuide.tsx',
  'src/components/FolderSharingDialog.tsx',
  'src/components/FolderShareManager.tsx',
  'src/components/ProfilePictureCard.tsx',
  'src/components/Settings.tsx',
  'src/components/ProfileImageCrop.tsx',
  'src/components/ProfileCameraCapture.tsx',
  'src/components/NotificationCenter.tsx',
  'src/components/ResetPassword.tsx',
  'src/components/RecordingModal.tsx',
  'src/components/RecordInterface.tsx',
  'src/components/ReceivedCapsules.tsx',
  'src/components/TitleRewardModal.tsx',
  'src/components/ProfilePictureUploadModal.tsx',
  'src/components/TitleCarousel.tsx',
  'src/components/TitleSelector.tsx',
  'src/components/TitleRewardModalEnhanced.tsx',
  'src/components/TrashManager.tsx',
  'src/components/VerifyEmail.tsx',
  'src/components/TitleUnlockPreview.tsx',
  'src/components/capsule-themes/CeremonyOverlay.tsx',
  'src/components/ui/tooltip.tsx',
  'src/components/ui/dialog.tsx',
  'src/components/ui/toggle.tsx',
  'src/components/ui/context-menu.tsx',
  'src/components/ui/toggle-group.tsx',
  'src/components/ui/command.tsx',
  'src/components/ui/tabs.tsx',
  'src/components/ui/collapsible.tsx',
  'src/components/ui/checkbox.tsx',
  'src/components/ui/switch.tsx',
  'src/components/ui/chart.tsx',
  'src/components/ui/sonner.tsx',
  'src/components/ui/carousel.tsx',
  'src/components/ui/slider.tsx',
  'src/components/ui/calendar.tsx',
  'src/components/ui/sidebar.tsx',
  'src/components/ui/button.tsx',
  'src/components/ui/sheet.tsx',
  'src/components/ui/breadcrumb.tsx',
  'src/components/ui/separator.tsx',
  'src/components/ui/badge.tsx',
  'src/components/ui/select.tsx',
  'src/components/ui/avatar.tsx',
  'src/components/ui/scroll-area.tsx',
  'src/components/ui/aspect-ratio.tsx',
  'src/components/ui/resizable.tsx',
  'src/components/ui/alert.tsx',
  'src/components/ui/radio-group.tsx',
  'src/components/ui/alert-dialog.tsx',
  'src/components/ui/progress.tsx',
  'src/components/ui/accordion.tsx',
  'src/components/ui/popover.tsx',
  'src/components/ui/pagination.tsx',
  'src/components/ui/navigation-menu.tsx',
  'src/components/ui/menubar.tsx',
  'src/components/ui/label.tsx',
  'src/components/ui/input-otp.tsx',
  'src/components/ui/hover-card.tsx',
  'src/components/ui/form.tsx',
  'src/components/ui/dropdown-menu.tsx',
  'src/components/ui/drawer.tsx',
];

// Regex to match version suffixes in import paths
// Matches patterns like: 'sonner@2.0.3' or "@radix-ui/react-dialog@1.1.6"
// But NOT patterns like: 'jsr:@supabase/supabase-js@2.49.8' (Deno-style imports in edge functions)
const versionedImportRegex = /from\s+(['"])((?!jsr:)[^'"]*?)@(\d+\.\d+\.\d+)\1/g;

let totalFixed = 0;

for (const file of files) {
  const filePath = resolve(projectRoot, file);
  try {
    let content = readFileSync(filePath, 'utf-8');
    const original = content;
    
    content = content.replace(versionedImportRegex, (match, quote, pkg, version) => {
      return `from ${quote}${pkg}${quote}`;
    });
    
    if (content !== original) {
      writeFileSync(filePath, content, 'utf-8');
      const changes = (original.match(versionedImportRegex) || []).length;
      totalFixed += changes;
      console.log(`Fixed ${changes} import(s) in ${file}`);
    }
  } catch (err) {
    console.error(`Error processing ${file}: ${err.message}`);
  }
}

console.log(`\nTotal: Fixed ${totalFixed} versioned imports across ${files.length} files.`);
