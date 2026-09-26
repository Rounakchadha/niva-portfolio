// Shows an <img> when `src` is set, otherwise a labeled placeholder box.
// `priority` marks the hero image so it loads eagerly at high priority
// (it's the page's LCP element) — everything else lazy-loads by default.
export default function Placeholder({ src, label, alt = '', className = '', priority = false }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    );
  }
  return <div className={`img-placeholder ${className}`.trim()} data-label={label} />;
}
