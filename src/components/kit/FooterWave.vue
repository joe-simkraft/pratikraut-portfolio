<script setup lang="ts">
/* Kit #05 — footer waveform. A cyan signal line with a faint red ghost that
   glitches at intervals, giving the footer a "signal terminated" feel. */
import { ref } from 'vue'
import { useCanvasScene } from '../../composables/useCanvasScene'

const cv = ref<HTMLCanvasElement | null>(null)
let glitchUntil = 0

useCanvasScene(cv, (ctx, w, h, t) => {
  ctx.clearRect(0, 0, w, h)
  const mid = h / 2
  if (t > glitchUntil && Math.random() < 0.01) glitchUntil = t + 0.4
  const glitching = t < glitchUntil

  for (const [off, col, a, lw] of [
    [-2, '255, 77, 90', 0.32, 1],
    [2, '53, 224, 232', 0.9, 1.4],
  ] as const) {
    ctx.beginPath()
    for (let x = 0; x <= w; x += 2) {
      const base =
        Math.sin(x * 0.018 + t * 2) * 9 + Math.sin(x * 0.006 - t) * 6
      const spike = glitching && Math.random() < 0.06 ? (Math.random() - 0.5) * 38 : 0
      const y = mid + base + spike + off
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = `rgba(${col}, ${a})`
    ctx.lineWidth = lw
    ctx.stroke()
  }
})
</script>

<template>
  <div class="wave" aria-hidden="true">
    <canvas ref="cv"></canvas>  </div>
</template>

<style scoped>
.wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 90px;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.kit-tag {
  right: 10px;
  bottom: 10px;
}
</style>
