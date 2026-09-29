<script setup lang="ts">
/* Kit #09 — oscilloscope figure. A glowing cyan Lissajous curve with a
   phosphor trail that slowly morphs as the phase drifts. */
import { ref } from 'vue'
import { useCanvasScene } from '../../composables/useCanvasScene'

const cv = ref<HTMLCanvasElement | null>(null)

useCanvasScene(
  cv,
  (ctx, w, h, t) => {
    // Fade the previous frame instead of clearing — builds a phosphor trail.
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(5, 7, 10, 0.12)'
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = 'lighter'
    const cx = w / 2
    const cy = h / 2
    const r = Math.min(w, h) * 0.34
    const a = 3
    const b = 2
    const delta = t * 0.4

    ctx.beginPath()
    for (let i = 0; i <= 240; i++) {
      const p = (i / 240) * Math.PI * 2
      const x = cx + r * Math.sin(a * p + delta)
      const y = cy + r * Math.sin(b * p)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = 'rgba(53, 224, 232, 0.9)'
    ctx.lineWidth = 1.4
    ctx.shadowColor = 'rgba(53, 224, 232, 0.8)'
    ctx.shadowBlur = 8
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.globalCompositeOperation = 'source-over'
  },
  {
    // Lay a solid ground down on (re)size so the translucent trail fade works.
    onResize: (w, h) => {
      const ctx = cv.value?.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#05070a'
        ctx.fillRect(0, 0, w, h)
      }
    },
  },
)
</script>

<template>
  <div class="osc" aria-hidden="true">
    <canvas ref="cv"></canvas>  </div>
</template>

<style scoped>
.osc {
  position: relative;
  width: 100%;
  max-width: 240px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  pointer-events: none;
  opacity: 0.9;
}

canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.kit-tag {
  left: 8px;
  top: 8px;
}

@media (max-width: 819px) {
  .osc {
    display: none;
  }
}
</style>
