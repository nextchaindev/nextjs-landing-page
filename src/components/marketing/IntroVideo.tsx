"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { trackEvent } from "@/lib/analytics"

const MOBILE_QUERY = "(max-width: 767px)"

const SOURCES = {
  desktop: { src: "/videos/nextchain-intro-16x9.mp4", poster: "/videos/nextchain-intro-16x9-poster.jpg" },
  mobile: { src: "/videos/nextchain-intro-9x16.mp4", poster: "/videos/nextchain-intro-9x16-poster.jpg" },
}

/**
 * Silent product intro: 9:16 on phones, 16:9 on larger screens.
 * Server HTML shows only the poster (<picture> picks the right one by media query);
 * the <video> mounts once the block scrolls near view, then autoplays muted on loop.
 * Reduced-motion users get the poster plus native controls instead of autoplay.
 */
export default function IntroVideo({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [variant, setVariant] = useState<"desktop" | "mobile" | null>(null)
  const [inView, setInView] = useState(false)
  const reduceMotion = useReducedMotion()
  const milestones = useRef(new Set<string>())

  // Native <video> is invisible to GA4 enhanced measurement; report the first
  // loop's start / 50% / complete once per page view.
  const handleProgress = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (!video.duration) return
    const percent = video.currentTime / video.duration
    for (const [name, threshold] of [["video_start", 0], ["video_progress", 0.5], ["video_complete", 0.95]] as const) {
      if (percent >= threshold && !milestones.current.has(name)) {
        milestones.current.add(name)
        trackEvent(name, { video_title: "nextchain_intro", video_variant: variant ?? "", video_percent: Math.round(threshold * 100) })
      }
    }
  }

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const update = () => setVariant(media.matches ? "mobile" : "desktop")
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const source = variant ? SOURCES[variant] : null

  return (
    <div
      ref={containerRef}
      className="relative mx-auto overflow-hidden rounded-2xl md:rounded-3xl bg-orange-50 shadow-2xl ring-1 ring-black/5 aspect-[9/16] w-full max-w-[400px] md:aspect-video md:max-w-[1040px]">
      {source && inView ? (
        <video
          key={source.src}
          className="absolute inset-0 h-full w-full object-cover"
          src={source.src}
          poster={source.poster}
          autoPlay={!reduceMotion}
          controls={Boolean(reduceMotion)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={title}
          onTimeUpdate={handleProgress}
        />
      ) : (
        <picture>
          <source media={MOBILE_QUERY} srcSet={SOURCES.mobile.poster} />
          <img
            src={SOURCES.desktop.poster}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}
    </div>
  )
}
