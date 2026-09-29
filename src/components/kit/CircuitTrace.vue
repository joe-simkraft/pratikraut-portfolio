<script setup lang="ts">
/* Kit #06 — circuit trace reveal. Faint PCB-style paths whose cyan overlays
   light up segment-by-segment, echoing the decrypt motion. Sits behind a
   section as a background. */
</script>

<template>
  <div class="circuit" aria-hidden="true">
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <path class="trace" d="M0 60 H90 V120 H150" />
      <path class="trace" d="M400 90 H320 V180 H250" />
      <path class="trace" d="M0 230 H120 V190" />
      <path class="trace" d="M400 250 H300 V210 H230" />

      <path class="trace live" d="M0 60 H90 V120 H150" />
      <path class="trace live d2" d="M400 90 H320 V180 H250" />
      <path class="trace live d3" d="M0 230 H120 V190" />
      <path class="trace live d4" d="M400 250 H300 V210 H230" />

      <circle class="pad on" cx="150" cy="120" r="4" />
      <circle class="pad on" cx="250" cy="180" r="4" />
      <circle class="pad" cx="120" cy="190" r="4" />
      <circle class="pad" cx="230" cy="210" r="4" />
      <circle class="pad on" cx="90" cy="60" r="3" />
      <circle class="pad on" cx="320" cy="90" r="3" />
    </svg>  </div>
</template>

<style scoped>
.circuit {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.6;
}

svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.trace {
  fill: none;
  stroke: var(--wire);
  stroke-width: 1;
}

.trace.live {
  stroke: var(--cyan);
  stroke-width: 1.3;
  stroke-dasharray: 340;
  stroke-dashoffset: 340;
  filter: drop-shadow(0 0 3px rgba(53, 224, 232, 0.6));
  animation: draw 3.4s ease-in-out infinite;
}
.trace.live.d2 { animation-delay: 0.6s; }
.trace.live.d3 { animation-delay: 1.2s; }
.trace.live.d4 { animation-delay: 1.8s; }

.pad {
  fill: var(--bg);
  stroke: var(--dim);
  stroke-width: 1;
}
.pad.on {
  stroke: var(--cyan);
}

.kit-tag {
  right: 10px;
  top: 10px;
}

@keyframes draw {
  0% { stroke-dashoffset: 340; }
  40%, 55% { stroke-dashoffset: 0; }
  95%, 100% { stroke-dashoffset: -340; }
}

@media (prefers-reduced-motion: reduce) {
  .trace.live {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
