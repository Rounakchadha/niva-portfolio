// Shows an <img> when `src` is set, otherwise a labeled placeholder box.
export default function Placeholder({ src, label, alt = '', className = '' }) {
  if (src) {
    return <img src={src} alt={alt} className={className} />;
  }
  return <div className={`img-placeholder ${className}`.trim()} data-label={label} />;
}
