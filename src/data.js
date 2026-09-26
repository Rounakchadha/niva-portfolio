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
    {
      title: 'Bollywood & Zumba Instructor — Anytime Fitness',
      detail: 'Indira Nagar, Lucknow | 1 Year',
      description: 'Worked as a Bollywood & Zumba instructor at Anytime Fitness, conducting energetic group sessions weekly for all age groups. Also hold a Letter of Recommendation from Anytime Fitness.',
      media: { src: '/images/photo-5.jpg', label: 'anytime-fitness.jpg' },
    },
    {
      title: 'IPL – CSK Roar Fest | Chennai',
      detail: 'Performance with Kings United',
      description: 'Performed as part of the Kings United team at the CSK Roar Fest in Chennai, a large-scale IPL celebration and live entertainment event.',
      media: { src: '/images/photo-4.jpg', label: 'csk-roar-fest.jpg', videoSrc: '/videos/csk-roar-fest.mp4' },
    },
    {
      title: 'The Booyah Awards 2026 | Free Fire MAX',
      detail: 'Greater Noida',
      description: "Performed at The Booyah Awards 2026, Free Fire MAX's India-focused awards celebration. The event was held at the India Expo Centre & Mart, Greater Noida, bringing together creators, esports players and entertainment performances.",
      media: { src: '/images/booyah-awards-2026.jpg', label: 'booyah-awards-2026.jpg' },
    },
    {
      title: 'AWPL Corporate Event 2026',
      detail: 'Performance with Kings United',
      description: 'Performed with Kings United at an AWPL corporate event, delivering a high-energy stage performance for a corporate audience.',
      media: { src: '/images/photo-portrait.jpg', label: 'awpl-corporate-event.jpg', videoSrc: '/videos/awpl-corporate-event.mp4' },
    },
    {
      title: 'Dhwani Bhanushali — "Banno Re" Music Video',
      detail: 'Celebrity work / featured dancer',
      description: 'Featured as a dancer in Dhwani Bhanushali\'s "Banno Re" music video.',
      media: { src: '/images/photo-2.png', label: 'dhwani-banno-re.jpg', videoSrc: '/videos/dhwani-banno-re.mp4' },
    },
    {
      title: 'Rian Mistry Productions',
      detail: 'Near Mumbai',
      description: 'Performed at a wedding event with Rian Mistry Productions near Mumbai.',
      media: { src: '/images/hero-bg.png', label: 'wedding-rian-mistry.jpg' },
    },
    {
      title: 'KnockSense – La Binge Fiesta, Lucknow',
      detail: 'DLF MyPad, Vibhuti Khand',
      description: "Performed as a dancer at KnockSense's La Binge Fiesta in Lucknow, taking part in the live event at DLF MyPad, Vibhuti Khand.",
      media: { src: '/images/knocksense-la-binge-fiesta.jpg', label: 'knocksense-la-binge-fiesta.jpg' },
    },
    {
      title: 'College & Dance Festivals — Mumbai',
      detail: 'Kshitij • Umang • Kiran',
      description: "Participated in some of Mumbai's well-known college festivals, performing across Battle, Bollywood and Street Dance formats.",
      media: { src: '/images/photo-2.png', label: 'college-fests-mumbai.jpg', videoSrc: '/videos/college-fests-mumbai.mp4' },
    },
    {
      title: 'Dance Battles — Lucknow & Mumbai',
      detail: null,
      description: 'Participated in local dance battles across Lucknow and Mumbai, gaining experience in freestyle, competitive environments and different street-dance styles.',
      media: { src: '/images/photo-4.jpg', label: 'dance-battles.jpg' },
    },
  ],

  training: [
    { title: 'St. Agnes Loreto Day School', detail: 'Lucknow — School' },
    { title: 'Jai Hind College', detail: 'Mumbai — BMM' },
  ],

  // Real reels, rendered via Instagram's own embed widget.
  moreVideos: [
    { id: 1, href: 'https://www.instagram.com/reel/DX649NhPv31/' },
    { id: 2, href: 'https://www.instagram.com/reel/DbQnbAeorT3/' },
    { id: 3, href: 'https://www.instagram.com/reel/DcbGKIQoOoX/' },
    { id: 4, href: 'https://www.instagram.com/reel/Dak5U19I0B5/' },
    { id: 5, href: 'https://www.instagram.com/reel/Dc8i50YTXMV/' },
    { id: 6, href: 'https://www.instagram.com/reel/DdHSsq9N0XR/' },
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
      { label: 'Instagram', href: 'https://instagram.com/niva.lulla' },
      { label: 'YouTube', href: 'https://youtube.com/REPLACE' },
      { label: 'Vimeo', href: 'https://vimeo.com/REPLACE' },
    ],
  },
};
