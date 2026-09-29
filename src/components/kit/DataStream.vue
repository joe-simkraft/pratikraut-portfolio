<script setup lang="ts">
/* Kit #04 — data-stream gutter. A sparse column of monospace glyphs rising up
   the empty right margin on wide screens. */
import { ref } from 'vue'
import { useCanvasScene } from '../../composables/useCanvasScene'

const cv = ref<HTMLCanvasElement | null>(null)

const glyphs = '01<>[]{}/!*=+_?^abcdef'.split('')
const cols = 3
const size = 15
const trail = 12
let drops: number[] = []
let height = 0

function seed(): void {
  // Spread the streaks across the height; they travel upward from here.
  drops = Array.from({ length: cols }, () => Math.random() * height)
}

useCanvasScene(
  cv,
  (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    ctx.font = `${size}px ui-monospace, Menlo, Consolas, monospace`
    for (let c = 0; c < cols; c++) {
      const x = (c + 0.5) * (w / cols)
      for (let k = 0; k < trail; k++) {
        const y = drops[c] + k * (size + 5)
        if (y < 0 || y > h) continue
        const glyph = glyphs[(Math.floor(y / 10) + c) % glyphs.length]
        if (k === 0) {
          // Bright glowing head.
          ctx.shadowColor = 'rgba(53, 224, 232, 0.9)'
          ctx.shadowBlur = 10
          ctx.fillStyle = 'rgba(210, 255, 255, 1)'
          ctx.fillText(glyph, x, y)
          ctx.shadowBlur = 0
        } else {
          // Cyan-tinted tail, fading but clearly readable.
          ctx.fillStyle = `rgba(70, 210, 220, ${Math.max(0.08, 0.85 - k * 0.075)})`
          ctx.fillText(glyph, x, y)
        }
      }
      // Rise upward; recycle to the bottom once the whole streak clears the top.
      drops[c] -= 0.9
      if (drops[c] + trail * (size + 5) < 0) drops[c] = h + Math.random() * 60
    }
  },
  {
    onResize: (_w, h) => {
      height = h
      seed()
    },
  },
)
</script>

<template>
  <div class="stream" aria-hidden="true">
    <canvas ref="cv"></canvas>  </div>
</template>

<style scoped>
.stream {
  position: fixed;
  top: 0;
  right: 0;
  width: 78px;
  height: 100vh;
  height: 100svh;
  /* Above the scanline/vignette overlay (z-index 3) so it isn't dimmed. */
  z-index: 5;
  pointer-events: none;
}

canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.kit-tag {
  right: 6px;
  bottom: 10px;
}

/* Only when there's a clear gutter (no overlap with the centred column). */
@media (max-width: 1240px) {
  .stream {
    display: none;
  }
}
</style>
