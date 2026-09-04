import { onUnmounted, ref, watch, type Ref } from 'vue'

export interface Reveal {
  /** Bind to the element that should trigger the reveal, via `ref`. */
  target: Ref<HTMLElement | null>
  /** Flips true once, when the element scrolls into view, and stays true. */
  revealed: Ref<boolean>
}

interface Options {
  /** Fraction of the element that must be visible. */
  threshold?: number
  /** Fire slightly before the element reaches the viewport edge. */
  rootMargin?: string
  /** Called the first time the element is revealed. */
  onReveal?: () => void
  /** Skip observation entirely and reveal at once. */
  immediate?: boolean
}

/**
 * One-shot intersection observer.
 *
 * Deliberately never un-reveals. Re-scrambling text when you scroll back up
 * would mean content the visitor has already read becomes unreadable again,
 * which is the fastest way to make this effect infuriating.
 */
export function useReveal(options: Options = {}): Reveal {
  const target = ref<HTMLElement | null>(null)
  const revealed = ref(false)
  let observer: IntersectionObserver | null = null

  function reveal(): void {
    if (revealed.value) return
    revealed.value = true
    options.onReveal?.()
    observer?.disconnect()
    observer = null
  }

  // Fail open: with no IntersectionObserver (old browser, jsdom, SSR) the
  // content shows rather than staying scrambled forever.
  const unsupported = typeof IntersectionObserver === 'undefined'

  if (options.immediate === true || unsupported) {
    revealed.value = true
  } else {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal()
            break
          }
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -8% 0px',
      },
    )

    // The element ref isn't populated until mount, so observe on assignment.
    watch(
      target,
      (el) => {
        if (el !== null) observer?.observe(el)
      },
      { immediate: true },
    )
  }

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { target, revealed }
}
