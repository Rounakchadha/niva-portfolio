// ==========================================================
// EDIT ME — every piece of site content lives here.
// Changing this file updates the whole site automatically.
//
// For images: set `src` to a path like "/images/photo-1.jpg"
// (drop the file in the /public/images folder) and it will
// replace the placeholder box. Leave `src: null` to keep the
// placeholder showing its label.
// ==========================================================

export const content = {
  name: 'Niva Lulla',

  hero: {
    styles: [
      'Waacking', 'Hip-Hop', 'Locking', 'House',
      'Freestyle', 'Bollywood', 'Jazz', 'Contemporary',
    ],
    tagline: 'Movement is the language I never have to translate.',
    // portrait shown beside the name in the hero
    photoSrc: '/images/photo-1.png',
    photoLabel: 'photo-1.png',
  },

  about: {
    portraitSrc: '/images/photo-portrait.jpg',
    portraitLabel: 'photo-portrait.jpg',
    bio: [
      "I'm Niva Lulla, a Mumbai-based dancer and performer. My journey began during lockdown and gradually grew into something I wanted to pursue professionally.",
      "Over the years, I've trained in multiple styles, performed at competitions, live events and concerts, taught dance, choreographed, collaborated with artists and worked on creative projects. Since moving to Mumbai, I've had the opportunity to work on bigger stages and take on professional projects that have pushed me to grow.",
      "I'm open-minded, eager to learn and always excited to try new things. For me, dance is about expression, connection and constantly evolving.",
    ],
  },

  videos: [
    // paste just the YouTube video ID (the part after v= or youtu.be/)
    { id: 1, youtubeId: 'LqnSdX3SvSo', title: 'Dhwani Bhanushali — Music Video' },
    { id: 2, youtubeId: 'gyg1msO62tQ', title: 'Booyah Awards — Dance Performance', startSeconds: 1003 },
  ],

  gallery: [
    { id: 1, label: 'photo-2.png', src: '/images/photo-2.png' },
    { id: 2, label: 'photo-4.jpg', src: '/images/photo-4.jpg' },
    { id: 3, label: 'photo-5.jpg', src: '/images/photo-5.jpg' },
  ],

  experience: [
    // `media.src` is a placeholder photo (recycled from the gallery/hero
    // shots below) until real event photos replace them — swap each `src`
    // for the matching real photo when it's ready, same as the gallery above.
    { year: '—', title: "King's Concert", detail: 'Celebrity performance', story: null, media: { src: '/images/photo-1.png', label: 'kings-concert.jpg' } },
    // Optional `media.videoSrc` — placeholder clip until a real performance reel is added.
    {
      year: '—',
      title: 'Dhwani Bhanushali — Music Video',
      detail: 'Celebrity work / featured dancer',
      story: null,
      media: {
        src: '/images/photo-2.png',
        label: 'dhwani-music-video.jpg',
        videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      },
    },
    { year: '—', title: 'IPL — CSK Roar Fest', detail: 'Group performance with Kings United', story: null, media: { src: '/images/photo-4.jpg', label: 'csk-roar-fest.jpg' } },
    { year: '—', title: 'Free Fire Event — Bodh Gaya Awards', detail: 'Performance with Kings United', story: null, media: { src: '/images/photo-5.jpg', label: 'bodh-gaya-awards.jpg' } },
    { year: '—', title: 'Corporate Event', detail: 'With Kings United', story: null, media: { src: '/images/photo-portrait.jpg', label: 'corporate-event.jpg' } },
    { year: '—', title: 'Wedding Event', detail: 'Rian Mistry Production', story: null, media: { src: '/images/hero-bg.png', label: 'wedding-event.jpg' } },
    { year: '—', title: 'Kshitij — Mithibai Fest', detail: 'Semi-finalist', story: null, media: { src: '/images/photo-1.png', label: 'kshitij-mithibai.jpg' } },
    { year: '—', title: 'Umang & Kiran', detail: 'College fest performances', story: null, media: { src: '/images/photo-2.png', label: 'umang-kiran.jpg' } },
    { year: '—', title: 'Waacking Workshop', detail: 'Bangalore', story: null, media: { src: '/images/photo-4.jpg', label: 'waacking-workshop.jpg' } },
    { year: '1 yr', title: 'Bollywood / Zumba Instructor', detail: 'Anytime Fitness', story: null, media: { src: '/images/photo-5.jpg', label: 'anytime-fitness.jpg' } },
  ],

  training: [
    { title: 'St. Agnes Loreto Day School', detail: 'Lucknow — School' },
    { title: 'Jai Hind College', detail: 'Mumbai — BMM' },
  ],

  // Silent, looping clips for the auto-scrolling reel in "More Videos &
  // Links" — all placeholders pointing at the same sample clip until real
  // performance cutdowns replace each `videoSrc`.
  moreVideos: [
    { id: 1, title: 'Performance clip 01', videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
    { id: 2, title: 'Performance clip 02', videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
    { id: 3, title: 'Performance clip 03', videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
    { id: 4, title: 'Performance clip 04', videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
    { id: 5, title: 'Performance clip 05', videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
    { id: 6, title: 'Performance clip 06', videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
  ],

  links: [
    { platform: 'Music Video', title: "Niva's Own Music Video", href: 'https://youtube.com/REPLACE' },
    { platform: 'Instagram', title: '@niva.lulla', href: 'https://instagram.com/REPLACE' },
    { platform: 'Vimeo', title: 'Studio Sessions', href: 'https://vimeo.com/REPLACE' },
    { platform: 'YouTube', title: 'Performance Reel', href: 'https://youtube.com/REPLACE' },
  ],

  contact: {
    note: 'For booking inquiries and collaborations, reach out below.',
    email: 'nivalulla36@gmail.com',
    phone: '+91 7706900889',
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/REPLACE' },
      { label: 'YouTube', href: 'https://youtube.com/REPLACE' },
      { label: 'Vimeo', href: 'https://vimeo.com/REPLACE' },
    ],
  },
};
