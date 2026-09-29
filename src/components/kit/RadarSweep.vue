<script setup lang="ts">
/* Kit #11 — radar sweep. A rotating arm over concentric rings that lights up
   blips as it passes them (one blip per project). */
import { ref } from 'vue'
import { useCanvasScene } from '../../composables/useCanvasScene'

const cv = ref<HTMLCanvasElement | null>(null)

const blips = [
  { a: 0.6, r: 0.5, lit: 0 },
  { a: 2.1, r: 0.72, lit: 0 },
  { a: 3.6, r: 0.35, lit: 0 },
  { a: 5.0, r: 0.62, lit: 0 },
]
let ang = -Math.PI / 2

useCanvasScene(cv, (ctx, w, h) => {
  ctx.clearRect(0, 0, w, h)
  const cx = w / 2
  const cy = h / 2
  const r = Math.min(w, h) * 0.4

  ctx.strokeStyle = 'rgba(233, 238, 244, 0.12)'
  ctx.lineWidth = 1
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath()
    ctx.arc(cx, cy, (r * i) / 3, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.moveTo(cx - r, cy)
  ctx.lineTo(cx + r, cy)
  ctx.moveTo(cx, cy - r)
  ctx.lineTo(cx, cy + r)
  ctx.stroke()

  // Trailing sweep wedge.
  ctx.save()
  ctx.translate(cx, cy)
  for (let i = 0; i < 24; i++) {
    const a0 = ang - i * 0.03
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, r, a0 - 0.03, a0)
    ctx.closePath()
    ctx.fillStyle = `rgba(53, 224, 232, ${0.14 * (1 - i / 24)})`
    ctx.fill()
  }
  ctx.restore()

  ctx.strokeStyle = 'rgba(53, 224, 232, 0.8)'
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r)
  ctx.stroke()

  for (const bl of blips) {
    const d = (((ang - bl.a) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    if (d < 0.08) bl.lit = 1
    if (bl.lit > 0.02) {
      const x = cx + Math.cos(bl.a) * r * bl.r
      const y = cy + Math.sin(bl.a) * r * bl.r
      ctx.beginPath()
      ctx.arc(x, y, 3 + bl.lit * 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(53, 224, 232, ${bl.lit})`
      ctx.shadowColor = 'rgba(53, 224, 232, 0.9)'
      ctx.shadowBlur = 8 * bl.lit
      ctx.fill()
      ctx.shadowBlur = 0
      bl.lit *= 0.985
    }
  }

  ang += 0.02
})
</script>

<template>
  <div class="radar" aria-hidden="true">
    <canvas ref="cv"></canvas>  </div>
</template>

<style scoped>
.radar {
  position: absolute;
  top: 8px;
  right: -30px;
  width: 230px;
  height: 230px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
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

@media (max-width: 760px) {
  .radar {
    display: none;
  }
}
</style>
