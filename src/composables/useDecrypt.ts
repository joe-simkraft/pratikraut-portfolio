import { onUnmounted, ref, watch, type ComputedRef, type Ref } from 'vue'
import {
  DEFAULT_SPEC,
  duration,
  frameAt,
  type ScrambleSpec,
} from '../lib/scramble'
import { subscribe } from '../lib/ticker'
import { prefersReducedMotion } from '../lib/motion'

export interface DecryptOptions extends Partial<Omit<ScrambleSpec, 'text'>> {
  /** Extra delay before this element's characters begin locking, ms. */
  delay?: number
  /** Begin resolving as soon as this flips true. */
  active: Ref<boolean> | ComputedRef<boolean>
  /** Jump straight to plain text when this flips true. */
  force?: Ref<boolean> | ComputedRef<boolean>
  /** Once resolved, hold this long then run again. Omit for a single pass. */
  cycleEvery?: number
  /** Called each time a pass completes. */
  onCycle?: () => void
}

export interface Decrypt {
  display: Ref<string>
  resolved: Ref<boolean>
}

/**
 * Binds one string to the shared ticker, resolving when `active` turns true.
 *
 * Until then it renders a stable scrambled frame at full width, so nothing on
 * the page reflows when the resolve begins.
 */
export function useDecrypt(
  text: Ref<string> | ComputedRef<string> | string,
  options: DecryptOptions,
): Decrypt {
  const source = typeof text === 'string' ? ref(text) : text
  const reduced = prefersReducedMotion()
  const delay = options.delay ?? 0

  const spec = (): ScrambleSpec => ({
    ...DEFAULT_SPEC,
    ...options,
    // Folding the delay into `hold` keeps the slot at full width from the
    // first paint instead of rendering empty until its turn arrives.
    hold: (options.hold ?? DEFAULT_SPEC.hold) + delay,
    text: source.value,
  })

  const skip = reduced || options.force?.value === true

  const display = ref(skip ? source.value : frameAt(spec(), 0))
  const resolved = ref(skip)

  let startedAt = 0
  let resolvedAt = 0
  let stop: (() => void) | null = null

  function detach(): void {
    stop?.()
    stop = null
  }

  function resolveNow(): void {
    detach()
    display.value = source.value
    resolved.value = true
  }

  function onFrame(now: number): void {
    const current = spec()
    const elapsed = now - startedAt
    const total = duration(current)

    display.value = frameAt(current, elapsed)

    if (elapsed < total) {
      resolved.value = false
      resolvedAt = 0
      return
    }

    display.value = current.text
    if (!resolved.value) {
      resolved.value = true
      resolvedAt = now
    }

    if (options.cycleEvery === undefined) {
      detach()
      return
    }

    if (now - resolvedAt >= options.cycleEvery) {
      options.onCycle?.()
      startedAt = now
      resolved.value = false
      resolvedAt = 0
    }
  }

  function start(): void {
    if (reduced || options.force?.value === true) {
      resolveNow()
      return
    }
    startedAt = performance.now()
    resolved.value = false
    resolvedAt = 0
    if (!stop) stop = subscribe(onFrame)
  }

  watch(
    options.active,
    (on) => {
      if (on) start()
    },
    { immediate: true },
  )

  if (options.force !== undefined) {
    watch(options.force, (on) => {
      if (on) resolveNow()
    })
  }

  // A changed source (rotating phrases) restarts the pass.
  watch(source, () => {
    if (reduced) display.value = source.value
  })

  onUnmounted(detach)

  return { display, resolved }
}
