<script setup lang="ts">
import { toRef } from 'vue'
import { useDecrypt } from '../composables/useDecrypt'
import { useDecryptContext } from '../composables/decryptContext'

interface Props {
  text: string
  active: boolean
  cycleEvery?: number
}

const props = defineProps<Props>()
const { forced } = useDecryptContext()

const { display, resolved } = useDecrypt(props.text, {
  active: toRef(props, 'active'),
  force: forced,
  stagger: 38,
  hold: 460,
  jitter: 220,
  cycleEvery: props.cycleEvery,
})
</script>

<template>
  <h1 class="title">
    <span
      class="glitch"
      :class="{ settled: resolved }"
      :data-text="display"
      aria-hidden="true"
      >{{ display }}</span
    >
    <span class="sr-only">{{ text }}</span>
  </h1>
</template>

<style scoped>
.title {
  margin: 0;
  font-size: clamp(30px, 8.4vw, 68px);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.05;
}

.glitch {
  position: relative;
  display: inline-block;
  white-space: pre;
  color: var(--fg);
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  white-space: pre;
  pointer-events: none;
}

.glitch::before {
  color: var(--red);
  transform: translate(-2px, 0);
  mix-blend-mode: screen;
  opacity: 0.75;
}

.glitch::after {
  color: var(--cyan);
  transform: translate(2px, 0);
  mix-blend-mode: screen;
  opacity: 0.75;
}

/* Occasional jolt once settled, so the hero stays alive without being busy. */
.settled::before {
  animation: jolt-a 6s steps(1) infinite;
}
.settled::after {
  animation: jolt-b 6s steps(1) infinite;
}

@keyframes jolt-a {
  0%, 88% { transform: translate(-1px, 0); clip-path: none; }
  90% { transform: translate(-5px, -2px); clip-path: inset(14% 0 56% 0); }
  93% { transform: translate(3px, 1px); clip-path: inset(62% 0 14% 0); }
  96%, 100% { transform: translate(-1px, 0); clip-path: none; }
}

@keyframes jolt-b {
  0%, 88% { transform: translate(1px, 0); clip-path: none; }
  90% { transform: translate(4px, 2px); clip-path: inset(48% 0 24% 0); }
  93% { transform: translate(-3px, -1px); clip-path: inset(20% 0 64% 0); }
  96%, 100% { transform: translate(1px, 0); clip-path: none; }
}

@media (prefers-reduced-motion: reduce) {
  .settled::before,
  .settled::after,
  .glitch::before,
  .glitch::after {
    animation: none;
    display: none;
  }
}
</style>
