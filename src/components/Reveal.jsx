import { useReveal } from '../hooks/useReveal.js';

// Wraps children in a div that fades/slides in on scroll.
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const { ref, className: revealClass } = useReveal();
  return (
    <Tag ref={ref} className={`${revealClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
