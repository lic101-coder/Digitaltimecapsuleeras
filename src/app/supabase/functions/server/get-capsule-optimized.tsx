/**
 * OPTIMIZED GET CAPSULE BY ID ENDPOINT
 * 
 * Fixes timeout issues by:
 * - Overall 25s timeout protection
 * - Timeouts on all KV operations (5s max)
 * - Removed slow auth fallback for sender name
 * - Parallel media loading with timeout (10s max)
 * - Limit to first 20 media files
 */

import * as kv from './kv_store.tsx';

export async function handleGetCapsuleById(c: any, verifyUserToken: any, supabase: any, getCapsuleReliable: any) {
  // ⚡ CRITICAL: Add overall 25s timeout to prevent exceeding 28s edge function limit
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Request timeout - response took too long')), 25000)
  );
  
  const mainPromise = async () => {
    try {
      // Check authentication
      const authHeader = c.req.header('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: "No authorization token provided" }, 401);
      }

      const token = authHeader.split(' ')[1];
      const { user, error: authError } = await verifyUserToken(token);
      if (authError || !user) {
        return c.json({ error: "Invalid or expired token" }, 401);
      }

      const capsuleId = c.req.param('id');
      console.log(`📋 [FAST-GET] Getting capsule: ${capsuleId}`);

      // Get capsule from KV store with timeout
      const capsule = await Promise.race([
        getCapsuleReliable(capsuleId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('KV timeout')), 5000))
      ]).catch(error => {
        console.error(`❌ [FAST-GET] Failed to get capsule:`, error);
        return null;
      });
      
      if (!capsule) {
        return c.json({ error: "Capsule not found" }, 404);
      }

      // Check if user has permission to view this capsule
      const isCreator = capsule.created_by === user.id;
      const isRecipient = capsule.recipients?.some(r => {
        const email = typeof r === 'string' ? r : (r.value || r.email || '');
        return email === user.email;
      }) || capsule.self_contact === user.email;

      if (!isCreator && !isRecipient) {
        return c.json({ error: "Not authorized to view this capsule" }, 403);
      }

      // ⚡ OPTIMIZATION: Load sender name with timeout, skip slow auth fallback
      let senderName = 'Someone Special';
      try {
        const senderProfile = await Promise.race([
          kv.get(`profile:${capsule.created_by}`),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Profile timeout')), 2000))
        ]);
        
        if (senderProfile) {
          if (senderProfile.display_name) {
            senderName = senderProfile.display_name.trim();
          } else {
            const fullName = `${senderProfile.first_name || ''} ${senderProfile.last_name || ''}`.trim();
            senderName = fullName || 'Someone Special';
          }
        }
      } catch (error) {
        console.warn('⏱️ [FAST-GET] Sender profile timeout, using default name');
      }

      console.log(`✅ [FAST-GET] Capsule ${capsuleId} retrieved with sender: ${senderName}`);

      // ⚡ OPTIMIZATION: Load media files with timeout and limit to 20 files
      let hydratedMediaFiles = [];
      if (capsule.media_files && Array.isArray(capsule.media_files) && capsule.media_files.length > 0) {
        const mediaCount = capsule.media_files.length;
        console.log(`🎬 [FAST-GET] Hydrating ${mediaCount} media files for capsule ${capsuleId}...`);
        
        try {
          // Limit to first 20 media files to prevent timeout
          const limitedMediaIds = capsule.media_files.slice(0, 20);
          if (mediaCount > 20) {
            console.log(`⚠️ [FAST-GET] Limiting to first 20 media files (out of ${mediaCount})`);
          }
          
          // Load media files in parallel with timeout
          const mediaLoadPromise = Promise.all(
            limitedMediaIds.map(async (mediaId) => {
              try {
                // Load media metadata with timeout
                const mediaFile = await Promise.race([
                  kv.get(`media:${mediaId}`),
                  new Promise((_, reject) => setTimeout(() => reject(new Error('Media timeout')), 2000))
                ]);
                
                if (mediaFile && mediaFile.storage_bucket && mediaFile.storage_path) {
                  // Generate signed URL with timeout
                  const urlPromise = supabase.storage
                    .from(mediaFile.storage_bucket)
                    .createSignedUrl(mediaFile.storage_path, 604800); // 7 days
                  
                  const { data, error: urlError } = await Promise.race([
                    urlPromise,
                    new Promise((_, reject) => setTimeout(() => reject(new Error('URL timeout')), 2000))
                  ]);
                  
                  if (!urlError && data?.signedUrl) {
                    return {
                      id: mediaFile.id,
                      file_name: mediaFile.file_name,
                      file_type: mediaFile.file_type,
                      media_type: mediaFile.file_type,
                      type: mediaFile.file_type,
                      file_size: mediaFile.file_size,
                      url: data.signedUrl,
                      file_url: data.signedUrl,
                      created_at: mediaFile.created_at
                    };
                  }
                }
                return null;
              } catch (err) {
                console.warn(`⏱️ [FAST-GET] Failed to hydrate media ${mediaId}:`, err.message || err);
                return null;
              }
            })
          );
          
          // Wait for all media with 10s timeout
          const results = await Promise.race([
            mediaLoadPromise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Media batch timeout')), 10000))
          ]).catch(error => {
            console.warn(`⏱️ [FAST-GET] Media loading timeout:`, error.message);
            return [];
          });
          
          hydratedMediaFiles = results.filter(m => m !== null);
          console.log(`✅ [FAST-GET] Hydrated ${hydratedMediaFiles.length}/${limitedMediaIds.length} media files`);
        } catch (error) {
          console.error('❌ [FAST-GET] Error hydrating media files:', error);
          // Continue without media
        }
      }

      return c.json({ 
        success: true, 
        capsule: {
          ...capsule,
          sender_name: senderName,
          media_files: hydratedMediaFiles.length > 0 ? hydratedMediaFiles : capsule.media_files
        }
      });

    } catch (error) {
      console.error("❌ [FAST-GET] Get capsule error:", error);
      return c.json({ error: "Failed to get capsule", details: error.message }, 500);
    }
  };
  
  // Race main promise with timeout
  return Promise.race([mainPromise(), timeoutPromise])
    .then(result => result)
    .catch(error => {
      console.error('❌ [FAST-GET] Request timeout:', error);
      return c.json({ 
        error: 'Request timeout',
        details: 'The capsule data took too long to load. Please try again.'
      }, 500);
    });
}
