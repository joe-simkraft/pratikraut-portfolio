<script setup lang="ts">
import { toRef } from 'vue'
import { useDecrypt } from '../composables/useDecrypt'
import { useDecryptContext } from '../composables/decryptContext'

interface Props {
  text: string
  /** Resolve when this is true — normally a section's revealed flag. */
  active: boolean
  delay?: number
  stagger?: number
  hold?: number
  jitter?: number
  /** Hold time before re-glitching. Omit to resolve once and stop. */
  cycleEvery?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  stagger: 26,
  hold: 300,
  jitter: 150,
})

const { forced } = useDecryptContext()

const { display, resolved } = useDecrypt(props.text, {
  active: toRef(props, 'active'),
  force: forced,
  delay: props.delay,
  stagger: props.stagger,
  hold: props.hold,
  jitter: props.jitter,
  cycleEvery: props.cycleEvery,
})
</script>

<template>
  <span class="wrap" :class="{ settled: resolved }">
    <!--
      While scrambling, the glyphs are noise to a screen reader, so they're
      hidden and a companion span carries the real string. Once resolved the
      glyphs *are* the real string, so the companion is dropped and the text
      appears exactly once in the DOM — otherwise every line would be indexed
      twice.
    -->
    <span
      class="glyphs"
      :data-text="display"
      :aria-hidden="resolved ? undefined : 'true'"
      >{{ display }}</span
    >
    <span v-if="!resolved" class="sr-only">{{ text }}</span>
  </span>
</template>

<style scoped>
.wrap {
  position: relative;
  display: inline-block;
}

.glyphs {
  position: relative;
  display: inline-block;
  white-space: pre-wrap;
}

/* Chromatic split only while unresolved — once settled the text goes clean
   so it stays comfortable to read. */
.glyphs::before,
.glyphs::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  white-space: pre-wrap;
  pointer-events: none;
  transition: opacity 300ms ease;
}

.glyphs::before {
  color: var(--red);
  transform: translate(-1.4px, 0);
  mix-blend-mode: screen;
  opacity: 0.7;
}

.glyphs::after {
  color: var(--cyan);
  transform: translate(1.4px, 0);
  mix-blend-mode: screen;
  opacity: 0.7;
}

.settled .glyphs::before,
.settled .glyphs::after {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .glyphs::before,
  .glyphs::after {
    display: none;
  }
}
</style>
