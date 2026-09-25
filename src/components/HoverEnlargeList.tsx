'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type HoverListAction = {
  label: string
  href?: string
  onClick?: () => void
  primary?: boolean
}

export type HoverListItem = {
  id: string
  title: string
  subtitle?: string
  tags?: string[]
  description?: string
  impact?: string[]
  actions?: HoverListAction[]
  image?: string
  imageLabel?: string
  videoSrc?: string
  href?: string
  onClick?: () => void
}

const DEFAULT_ITEMS: HoverListItem[] = [
  { id: '1', title: 'First Item', subtitle: 'A short tag or category', image: '/placeholder-1.jpg' },
  { id: '2', title: 'Second Item', subtitle: 'A short tag or category', image: '/placeholder-2.jpg' },
  { id: '3', title: 'Third Item', subtitle: 'A short tag or category', image: '/placeholder-3.jpg' },
]

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }
const panelSpring = { type: 'spring' as const, stiffness: 260, damping: 32 }

function itemIsExpandable(item: HoverListItem) {
  return Boolean(
    item.description ||
      item.impact?.length ||
      item.actions?.length ||
      item.videoSrc ||
      (item.image && (item.tags?.length || item.impact?.length || item.description)),
  )
}

// matchMedia doesn't exist during server-side rendering, so this MUST be read
// inside useEffect (client-only), never during the initial render.
function useHasHover() {
  const [hasHover, setHasHover] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)')
    setHasHover(mq.matches)
    const onChange = () => setHasHover(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return hasHover
}

function TagPills({ tags }: { tags: string[] }) {
  return (
    <div className="hidden sm:flex flex-wrap gap-2 justify-end shrink-0 max-w-[min(100%,20rem)]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-1 text-xs text-white/55 border border-white/12 rounded-full bg-white/[0.04] whitespace-nowrap"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function MediaPreview({ item }: { item: HoverListItem }) {
  if (!item.image && !item.videoSrc) return null

  return (
    <div className="relative w-full max-w-[280px] mx-auto lg:mx-0 lg:w-[280px] lg:shrink-0 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      {item.videoSrc ? (
        <video
          src={item.videoSrc}
          className="absolute inset-0 h-full w-full object-cover object-center"
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <img
          src={item.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
    </div>
  )
}

function ExpandedPanel({ item }: { item: HoverListItem }) {
  const hasMedia = Boolean(item.image || item.videoSrc)

  return (
    <div className="pt-3 pb-6 space-y-5">
      <div
        className={
          hasMedia
            ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6 lg:gap-8 lg:items-start'
            : 'min-w-0'
        }
      >
        <div className="space-y-5 min-w-0">
          {item.description && (
            <p className="text-base md:text-lg text-white/55 leading-relaxed">
              {item.description}
            </p>
          )}
          {item.impact && item.impact.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-black/50 p-5 md:p-6">
              <p className="text-[11px] font-mono tracking-[0.2em] text-white/35 mb-3">
                IMPACT &amp; RESULTS
              </p>
              <ul className="space-y-2.5 text-sm md:text-base text-white/70">
                {item.impact.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-white/25 shrink-0">—</span>
                    <span className="min-w-0">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {hasMedia && (
          <div className="lg:pt-0.5 lg:self-start">
            <MediaPreview item={item} />
          </div>
        )}
      </div>

      {item.actions && item.actions.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {item.actions.map((action) => {
            const className = action.primary
              ? 'inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-black text-xs font-semibold tracking-wide hover:bg-white/90 transition-colors'
              : 'inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/25 text-white text-xs font-semibold tracking-wide hover:border-white/50 transition-colors'
            if (action.href) {
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={className}
                  onClick={(e) => e.stopPropagation()}
                >
                  {action.label}
                </a>
              )
            }
            return (
              <button
                key={action.label}
                type="button"
                className={className}
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick?.()
                }}
              >
                {action.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function HoverEnlargeList({
  items = DEFAULT_ITEMS,
  showIndex = true,
  showPreviewImage = true,
}: {
  items?: HoverListItem[]
  showIndex?: boolean
  showPreviewImage?: boolean
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const hasHover = useHasHover()

  const active = items.find((i) => i.id === activeId) ?? null

  const clearActiveUnlessInside = (root: HTMLElement, related: EventTarget | null) => {
    if (related instanceof Node && root.contains(related)) return
    setActiveId(null)
  }

  return (
    <div className="relative w-full">
      <div className="flex flex-col rounded-xl md:rounded-2xl border border-white/15 overflow-visible">
        {items.map((item, index) => {
          const isActive = hasHover && activeId === item.id
          const isDimmed = hasHover && activeId !== null && activeId !== item.id
          const expandable = itemIsExpandable(item)

          if (expandable) {
            return (
              <motion.div
                key={item.id}
                animate={{ opacity: isDimmed ? 0.4 : 1 }}
                transition={spring}
                className="border-b border-white/15 last:border-b-0"
              >
                <div
                  tabIndex={0}
                  role="group"
                  aria-label={item.title}
                  onMouseEnter={() => setActiveId(item.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(item.id)}
                  onBlur={(e) => clearActiveUnlessInside(e.currentTarget, e.relatedTarget)}
                  className={`w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset transition-colors px-4 md:px-5 ${
                    isActive ? 'bg-white/[0.05]' : 'bg-transparent'
                  }`}
                >
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-4 gap-y-2 w-full cursor-default py-4 md:py-5">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1 basis-full sm:basis-auto">
                      {showIndex && (
                        <span className="text-xs text-white/40 font-mono w-6 shrink-0 tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      )}
                      <h3 className="text-lg md:text-xl font-bold tracking-tight leading-tight text-white min-w-0">
                        {item.title}
                      </h3>
                    </div>
                    {item.tags?.length ? (
                      <TagPills tags={item.tags} />
                    ) : (
                      item.subtitle && (
                        <span className="hidden md:block text-xs text-white/50 shrink-0">
                          {item.subtitle}
                        </span>
                      )
                    )}
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={panelSpring}
                        className="overflow-hidden min-h-0"
                      >
                        <ExpandedPanel item={item} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          }

          const Tag = item.href ? 'a' : 'button'

          return (
            <motion.div
              key={item.id}
              animate={{ opacity: isDimmed ? 0.4 : 1 }}
              transition={spring}
              className="border-b border-white/15 last:border-b-0"
            >
              <Tag
                {...(item.href ? { href: item.href } : { type: 'button' })}
                onClick={item.onClick}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(item.id)}
                onBlur={() => setActiveId(null)}
                className="group w-full flex items-center justify-between gap-4 py-3.5 md:py-4 px-3 md:px-4 cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg bg-transparent"
              >
                <div className="flex items-baseline gap-3 md:gap-4">
                  {showIndex && (
                    <span className="text-[10px] text-white/40 font-mono w-5 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                  <motion.h3
                    animate={{ fontSize: isActive ? '1.25rem' : '1.125rem' }}
                    transition={spring}
                    className="font-bold tracking-tight leading-snug text-white"
                  >
                    {item.title}
                  </motion.h3>
                </div>
                {item.subtitle && (
                  <span className="hidden md:block text-xs text-white/50 shrink-0">
                    {item.subtitle}
                  </span>
                )}
              </Tag>
            </motion.div>
          )
        })}
      </div>

      {showPreviewImage && (
        <div className="hidden lg:block pointer-events-none fixed top-1/2 right-16 -translate-y-1/2 w-72 h-48 z-10">
          <AnimatePresence mode="wait">
            {active?.image && !itemIsExpandable(active) && (
              <motion.img
                key={active.id}
                src={active.image}
                alt=""
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
