import { useReveal } from '../hooks/useReveal'

/**
 * Wraps anything in a scroll-triggered entrance.
 *
 *   <Reveal variant="up" delay={120}>…</Reveal>
 *
 * variant: 'up' | 'blur' | 'scale' | 'left' | 'right' | 'fade'
 * All of it is inert when the visitor prefers reduced motion (handled in CSS).
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const [ref, shown] = useReveal()
  const variantClass = variant === 'fade' ? '' : `reveal-${variant}`

  return (
    <Tag
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal ${variantClass} ${shown ? 'is-in' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
