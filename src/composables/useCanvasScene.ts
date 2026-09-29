import { onBeforeUnmount, onMounted, type Ref } from 'vue'

type RenderFn = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) => void

interface Options {
  /** Called after every resize (and once on mount) with CSS-pixel size. */
  onResize?: (w: number, h: number) => void
}

/**
 * Shared plumbing for the decorative canvas scenes in components/kit:
 *
 *  - DPR-aware sizing (capped at 2 so retina doesn't quadruple the fill cost),
 *  - a rAF loop that pauses while the canvas is scrolled out of view, and
 *  - a single static frame when the visitor prefers reduced motion.
 *
 * The render callback owns its own scene state via closure; `onResize` is the
 * hook to reseed anything that depends on the pixel size.
 */
export function useCanvasScene(
  el: Ref<HTMLCanvasElement | null>,
  render: RenderFn,
  options: Options = {},
): void {
  onMounted(() => {
    const cv = el.value
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const start = performance.now()

    function fit(): void {
      const rect = cv!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv!.width = Math.max(1, Math.round(rect.width * dpr))
      cv!.height = Math.max(1, Math.round(rect.height * dpr))
      w = rect.width
      h = rect.height
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      options.onResize?.(w, h)
    }

    function loop(now: number): void {
      render(ctx!, w, h, (now - start) / 1000)
      raf = !reduce && visible ? requestAnimationFrame(loop) : 0
    }

    fit()
    render(ctx, w, h, 0)
    if (!reduce) raf = requestAnimationFrame(loop)

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
        if (visible && !reduce && raf === 0) raf = requestAnimationFrame(loop)
        else if (!visible && raf !== 0) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 },
    )
    io.observe(cv)

    const onResize = (): void => {
      fit()
      if (reduce) render(ctx!, w, h, 0)
    }
    window.addEventListener('resize', onResize)

    onBeforeUnmount(() => {
      if (raf !== 0) cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
    })
  })
}
