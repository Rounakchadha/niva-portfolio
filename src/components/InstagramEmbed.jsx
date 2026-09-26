import { useEffect } from 'react';

let embedScriptPromise = null;
function loadInstagramEmbedScript() {
  if (window.instgrm) return Promise.resolve();
  if (!embedScriptPromise) {
    embedScriptPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  }
  return embedScriptPromise;
}

// Renders Instagram's own official embed widget for a public post — the
// only way to show the real thumbnail/caption without the post owner's
// login (Instagram won't serve the raw video file to us otherwise).
export default function InstagramEmbed({ url }) {
  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds?.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        View this reel on Instagram
      </a>
    </blockquote>
  );
}
