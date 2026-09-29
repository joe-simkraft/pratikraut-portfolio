<script setup lang="ts">
/* Kit #03 — glitch section dividers. Three interchangeable styles that replace
   the flat rule at the top of a section:
     a · break   — a hairline that splits into a red/cyan offset
     b · dashed  — a data-line with a lit segment and a node
     c · signal  — a spiky signal blip
   Pick per section via the `variant` prop. */
withDefaults(defineProps<{ variant?: 'a' | 'b' | 'c' }>(), { variant: 'a' })
</script>

<template>
  <div class="divider" aria-hidden="true">
    <svg
      v-if="variant === 'c'"
      class="svg"
      viewBox="0 0 900 24"
      preserveAspectRatio="none"
    >
      <path
        d="M0 12 H300 l10 -7 l14 14 l10 -7 H360 l6 -9 l8 18 l6 -9 H900"
        fill="none"
        stroke="var(--cyan)"
        stroke-width="1.2"
        opacity="0.85"
      />
    </svg>

    <svg
      v-else-if="variant === 'b'"
      class="svg"
      viewBox="0 0 900 24"
      preserveAspectRatio="none"
    >
      <line x1="0" y1="12" x2="900" y2="12" stroke="var(--rule)" stroke-width="1" stroke-dasharray="2 6" />
      <line x1="120" y1="12" x2="180" y2="12" stroke="var(--cyan)" stroke-width="1" stroke-dasharray="2 6" opacity="0.8" />
      <rect x="446" y="7" width="8" height="10" fill="var(--bg)" stroke="var(--cyan)" stroke-width="1" />
    </svg>

    <svg v-else class="svg" viewBox="0 0 900 24" preserveAspectRatio="none">
      <line x1="0" y1="12" x2="360" y2="12" stroke="var(--rule)" stroke-width="1" />
      <line x1="360" y1="9" x2="430" y2="9" stroke="var(--red)" stroke-width="1.4" />
      <line x1="360" y1="15" x2="430" y2="15" stroke="var(--cyan)" stroke-width="1.4" />
      <line x1="430" y1="12" x2="900" y2="12" stroke="var(--rule)" stroke-width="1" />
    </svg>
  </div>
</template>

<style scoped>
.divider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
}

.svg {
  display: block;
  width: 100%;
  height: 24px;
}

.kit-tag {
  right: 0;
  top: -6px;
}
</style>
