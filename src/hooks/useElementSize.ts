"use client"

import { useState, useLayoutEffect, useEffect, useRef } from "react"

interface ElementSize {
  width: number
  height: number
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

/**
 * Hook to track the size of an element by its ID using ResizeObserver.
 * Handles cases where the element might be added/removed from the DOM.
 * @param id The HTML ID of the element to track.
 * @returns { width: number, height: number }
 */
export default function useElementSize(id: string): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })
  const elementRef = useRef<HTMLElement | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return

    const updateSize = () => {
      const el = document.getElementById(id)
      if (el) {
        const { width, height } = el.getBoundingClientRect()
        // If the size is actually different, update state
        setSize((prev) => {
          if (prev.width === width && prev.height === height) return prev
          return { width, height }
        })
      } else {
        setSize((prev) => {
          if (prev.width === 0 && prev.height === 0) return prev
          return { width: 0, height: 0 }
        })
      }
    }

    const setupObserver = () => {
      const el = document.getElementById(id)
      
      if (el !== elementRef.current) {
        // Element changed (or appeared/disappeared)
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect()
        }

        if (el) {
          resizeObserverRef.current = new ResizeObserver(() => {
            updateSize()
          })
          resizeObserverRef.current.observe(el)
          updateSize()
        } else {
          setSize({ width: 0, height: 0 })
        }
        elementRef.current = el
      }
    }

    // Initial setup
    setupObserver()

    // Create a MutationObserver to watch for our element being added to the DOM
    const mutationObserver = new MutationObserver(() => {
      setupObserver()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Also watch for window resize as a fallback or for global layout shifts
    window.addEventListener("resize", updateSize)

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
      mutationObserver.disconnect()
      window.removeEventListener("resize", updateSize)
    }
  }, [id])

  return size
}
