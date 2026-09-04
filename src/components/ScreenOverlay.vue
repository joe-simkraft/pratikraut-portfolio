<template>
  <div class="overlay" aria-hidden="true">
    <div class="scanlines"></div>
    <div class="vignette"></div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 3;
}

.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.022) 0 1px,
    transparent 1px 3px
  );
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 52%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
</style>
