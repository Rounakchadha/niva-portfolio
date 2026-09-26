import { useEffect, useRef } from 'react';
import InstagramEmbed from './InstagramEmbed.jsx';

// Very slow px/second — a CSS `animation` can't drive this because it
// requires `overflow: hidden`, which blocks native touch/trackpad swipe.
// Instead this nudges the real scrollLeft of a genuinely scrollable
// container each frame, so manual swiping still works and overrides the
// auto-scroll while it's happening.
const SPEED_PX_PER_SEC = 12;
const RESUME_DELAY_MS = 1500;

export default function InstagramReel({ videos }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(null);

  // Tripled, with the scroll position started in the middle copy, so there's
  // a full set of items to travel through in EITHER direction (forward or
  // backward swipe) before a wraparound correction is needed — that's what
  // makes it feel infinite instead of hitting a wall at one end.
  const track = [...videos, ...videos, ...videos];

  useEffect(() => {
    const container = containerRef.current;
    const trackEl = trackRef.current;
    if (!container || !trackEl) return undefined;

    const setWidth = trackEl.scrollWidth / 3;
    container.scrollLeft = setWidth;

    // Runs on every scroll event, whatever moved it (the rAF auto-scroll
    // below, or the user's own swipe/drag) — wraps the position back into
    // the middle copy once it drifts a full set-width to either side.
    const onScroll = () => {
      if (container.scrollLeft >= setWidth * 2) {
        container.scrollLeft -= setWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += setWidth;
      }
    };
    container.addEventListener('scroll', onScroll, { passive: true });

    let rafId;
    let lastTime = null;

    const step = (time) => {
      if (lastTime == null) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!pausedRef.current) {
        container.scrollLeft += SPEED_PX_PER_SEC * dt;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('scroll', onScroll);
    };
  }, [videos.length]);

  const pause = () => {
    pausedRef.current = true;
    clearTimeout(resumeTimerRef.current);
  };

  const scheduleResume = () => {
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  };

  return (
    <div
      ref={containerRef}
      className="insta-reel"
      onPointerDown={pause}
      onPointerUp={scheduleResume}
      onPointerCancel={scheduleResume}
      onWheel={() => {
        pause();
        scheduleResume();
      }}
      onTouchStart={pause}
      onTouchEnd={scheduleResume}
    >
      <div ref={trackRef} className="insta-reel-track">
        {track.map((video, i) => (
          <div className="insta-reel-item" key={`${video.id}-${i}`}>
            <InstagramEmbed url={video.href} />
          </div>
        ))}
      </div>
    </div>
  );
}
