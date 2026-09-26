import { useEffect, useRef, useState } from 'react';
import { content } from './data.js';
import Reveal from './components/Reveal.jsx';
import Placeholder from './components/Placeholder.jsx';
import HoverEnlargeList from './components/HoverEnlargeList.tsx';
import InstagramReel from './components/InstagramReel.jsx';
import SocialIcon from './components/SocialIcon.jsx';

const NAV_ITEMS = [
  ['about', 'About'],
  ['videos', 'Videos'],
  ['gallery', 'Gallery'],
  ['experience', 'Experience'],
  ['links', 'Links'],
  ['contact', 'Contact'],
];

function SectionHead({ n, title, hl, center, tagline }) {
  return (
    <Reveal className={`section-head${center ? ' center' : ''}`}>
      <div className="section-head-row">
        <span className="section-eyebrow">{n}</span>
        <h2 className="section-title">
          {title} {hl && <span className="hl">{hl}</span>}
        </h2>
      </div>
      {tagline && <p className="section-tagline">{tagline}</p>}
    </Reveal>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const playerRef = useRef(null);
  const playerElRef = useRef(null);
  const didMountVideoRef = useRef(false);
  const playerCreatedRef = useRef(false);
  // cueVideoById is only guaranteed to work after the player's onReady event —
  // calling it earlier (e.g. clicking a dot right after the page loads)
  // silently no-ops, which looked like "switching does nothing".
  const playerReadyRef = useRef(false);
  const pendingVideoIndexRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Load the YouTube IFrame API once and create a single player instance.
  // Guarded against StrictMode's double effect invocation in dev, which would
  // otherwise create a second player against a stale DOM node.
  useEffect(() => {
    if (playerCreatedRef.current) return;
    playerCreatedRef.current = true;

    const createPlayer = () => {
      playerRef.current = new window.YT.Player(playerElRef.current, {
        videoId: content.videos[0].youtubeId,
        width: '100%',
        height: '100%',
        playerVars: { rel: 0, autoplay: 0 },
        events: {
          onReady: () => {
            playerReadyRef.current = true;
            // A dot may have been clicked before the player finished
            // initializing — apply that switch now instead of dropping it.
            if (pendingVideoIndexRef.current !== null) {
              const video = content.videos[pendingVideoIndexRef.current];
              pendingVideoIndexRef.current = null;
              playerRef.current.cueVideoById({
                videoId: video.youtubeId,
                startSeconds: video.startSeconds || 0,
              });
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevReady?.();
        createPlayer();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
    }
  }, []);

  // Swap the loaded video whenever the user picks a different one (skip the initial mount).
  useEffect(() => {
    if (!didMountVideoRef.current) {
      didMountVideoRef.current = true;
      return;
    }
    // cueVideoById (not loadVideoById) — loads the video without starting
    // playback, so picking a dot doesn't auto-play it. If the player hasn't
    // fired onReady yet, queue this switch instead of dropping it — the
    // onReady handler above will apply it once the player can actually
    // accept commands.
    if (!playerReadyRef.current) {
      pendingVideoIndexRef.current = activeVideo;
      return;
    }
    const video = content.videos[activeVideo];
    playerRef.current?.cueVideoById?.({ videoId: video.youtubeId, startSeconds: video.startSeconds || 0 });
  }, [activeVideo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setLightboxItem(null);
      setNavOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav id="site-nav" className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo">{content.name.toUpperCase()}</a>
        <button
          id="nav-toggle"
          className={navOpen ? 'is-open' : ''}
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={navOpen}
          onClick={() => setNavOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
        <ul id="nav-links" className={navOpen ? 'is-open' : ''}>
          {NAV_ITEMS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setNavOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Tapping anywhere outside the open mobile menu closes it — without
          this, the only way to close it was tapping the hamburger itself
          again, which gave no visual feedback that it would work. */}
      <div
        id="nav-backdrop"
        className={navOpen ? 'is-open' : ''}
        onClick={() => setNavOpen(false)}
        aria-hidden="true"
      />

      <section id="hero" className="hero">
        <div className="hero-overlay" />
        <div className="hero-grid">
          <div className="hero-text">
            <Reveal className="hero-content">
              <p className="hero-eyebrow">Dancer &amp; Performer</p>
              <h1 className="hero-name">{content.name}</h1>
              <p className="hero-tagline">{content.hero.tagline}</p>
            </Reveal>
            <Reveal className="hero-styles">
              <h2 className="hero-styles-heading">Styles I&rsquo;m trained in</h2>
              <ul className="hero-styles-list">
                {content.hero.styles.map((style, i) => (
                  <li key={i}>{style}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="hero-photo">
            <Placeholder src={content.hero.photoSrc} label={content.hero.photoLabel} alt={`${content.name} portrait`} priority />
          </Reveal>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="about-grid">
          <Reveal className="about-photo">
            <Placeholder src={content.about.portraitSrc} label={content.about.portraitLabel} alt={`${content.name} portrait`} />
          </Reveal>
          <div className="about-text">
            <SectionHead n="01" title="About" />
            {content.about.bio.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      </section>

      <section id="videos" className="section reel">
        <SectionHead n="02" title="Featured" hl="Videos" center />
        <Reveal className="reel-frame">
          <div ref={playerElRef} />
        </Reveal>
        <div className="reel-dots">
          {content.videos.map((video, i) => (
            <button
              key={video.id}
              className={`reel-dot${i === activeVideo ? ' is-active' : ''}`}
              onClick={() => setActiveVideo(i)}
              aria-label={video.title}
            >
              <span className="reel-dot-label">{video.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="gallery" className="section gallery">
        <SectionHead n="03" title="Gallery" center />
        <div className="gallery-grid">
          {content.gallery.map((item) => (
            <Reveal
              as="div"
              key={item.id}
              className="gallery-item"
              onClick={() => setLightboxItem(item)}
            >
              <Placeholder src={item.src} label={item.label} alt={`${content.name} — gallery photo`} />
            </Reveal>
          ))}
        </div>
      </section>

      <div className={`lightbox${lightboxItem ? ' is-open' : ''}`}>
        <button id="lightbox-close" aria-label="Close" onClick={() => setLightboxItem(null)}>&times;</button>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          {lightboxItem && (
            <Placeholder src={lightboxItem.src} label={lightboxItem.label} alt={`${content.name} — gallery photo`} />
          )}
        </div>
      </div>

      <section id="experience" className="section experience">
        <SectionHead
          n="04"
          title="Experience"
          tagline="Live Performances • Events • Commercial Work • Dance Training"
        />
        <HoverEnlargeList
          showPreviewImage={false}
          items={content.experience.map((item, i) => ({
            id: String(i),
            title: item.title,
            tags: item.tags ?? (item.detail ? [item.detail] : []),
            description:
              item.description
              ?? `Short placeholder for “${item.title}” — role, setting, and one line on the vibe.`,
            impact: item.impact,
            actions: item.actions ?? [
              { label: 'VIEW CLIP', primary: true, href: '#videos' },
              { label: 'GALLERY', href: '#gallery' },
            ],
            image: item.media?.src ?? undefined,
            imageLabel: item.media?.label,
            videoSrc: item.media?.videoSrc ?? undefined,
          }))}
        />
      </section>

      <section id="links" className="section links">
        <SectionHead n="05" title="More" hl="Videos" center />
        <InstagramReel videos={content.moreVideos} />
      </section>

      <section id="contact" className="section contact">
        <SectionHead n="06" title="Contact" center />
        <Reveal className="contact-content">
          <p className="contact-note">{content.contact.note}</p>
          <a className="contact-email" href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
          <div className="contact-meta">
            <a className="contact-phone" href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>
              <SocialIcon name="phone" size={14} />
              {content.contact.phone}
            </a>
            <div className="contact-socials">
              {content.contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  title={s.label}
                >
                  <SocialIcon name={s.label} size={18} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
        <footer className="site-footer">
          <p>&copy; {new Date().getFullYear()} {content.name}. All rights reserved.</p>
        </footer>
      </section>
    </>
  );
}
