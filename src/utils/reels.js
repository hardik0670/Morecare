/* ==========================================================================
   INSTAGRAM REELS DATA — @morecare.mobility
   ========================================================================== */

export const INSTAGRAM_REELS = [
  { id: 'DZFfIA6pca0', url: 'https://www.instagram.com/p/DZFfIA6pca0/' },
  { id: 'DYUe65_xggs', url: 'https://www.instagram.com/p/DYUe65_xggs/' },
  { id: 'DYXJR1WxyxL', url: 'https://www.instagram.com/p/DYXJR1WxyxL/' },
  { id: 'DYgw9VoRFad', url: 'https://www.instagram.com/p/DYgw9VoRFad/' },
  { id: 'DPks3Mkkaxj', url: 'https://www.instagram.com/p/DPks3Mkkaxj/' },
  { id: 'DPX09kHER5b', url: 'https://www.instagram.com/p/DPX09kHER5b/' },
  { id: 'DPSrS_uke53', url: 'https://www.instagram.com/p/DPSrS_uke53/' },
  { id: 'DN2UmFAYh5f', url: 'https://www.instagram.com/p/DN2UmFAYh5f/' },
  { id: 'DJ6hjDUPIkY', url: 'https://www.instagram.com/p/DJ6hjDUPIkY/' },
  { id: 'DKJ4TlpPHIM', url: 'https://www.instagram.com/p/DKJ4TlpPHIM/' },
  { id: 'DNfIrMgPHmx', url: 'https://www.instagram.com/p/DNfIrMgPHmx/' }
];
const TONE_CLASSES = ['mc-reel-tone-blue', 'mc-reel-tone-green', 'mc-reel-tone-deep'];

export function getReelToneClass(index) {
  return TONE_CLASSES[index % TONE_CLASSES.length];
}

