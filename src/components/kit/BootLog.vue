<script setup lang="ts">
/* Kit #08 — boot / POST sequence. A fake system log that types itself out on
   mount and lands on a blinking cursor. Reduced motion shows it complete. */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const host = ref<HTMLElement | null>(null)

// \x01 -> ok (cyan), \x02 -> warn (red), \x03 -> cursor.
const lines = [
  '> pratikraut.in // cold boot',
  '> mount /work .............. \x01ok',
  '> mount /skills ............ \x01ok',
  '> decrypt module .......... \x01armed',
  '> integrity check ......... \x02weak signal',
  '> render pipeline ......... \x01ready',
  '\x03',
]

let timer = 0

function toHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\x01([^\n]*)/g, '<span class="ok">$1</span>')
    .replace(/\x02([^\n]*)/g, '<span class="warn">$1</span>')
    .replace(/\x03/g, '<span class="cur"></span>')
}

onMounted(() => {
  const el = host.value
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    el.innerHTML = toHtml(lines.join('\n'))
    return
  }

  let li = 0
  let ci = 0
  let acc = ''
  const step = (): void => {
    if (li >= lines.length) return
    const line = lines[li]
    if (ci <= line.length) {
      el.innerHTML = toHtml(acc + line.slice(0, ci))
      ci += 1
      timer = window.setTimeout(step, line[ci - 2] === '.' ? 8 : 26)
    } else {
      acc += line + '\n'
      li += 1
      ci = 0
      timer = window.setTimeout(step, 180)
    }
  }
  step()
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="boot" aria-hidden="true">
    <pre ref="host" class="log"></pre>  </div>
</template>

<style scoped>
.boot {
  position: absolute;
  right: 0;
  bottom: 4px;
  z-index: 1;
  pointer-events: none;
  max-width: 320px;
}

.log {
  margin: 0;
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1.85;
  color: var(--mut);
  white-space: pre-wrap;
}

.log :deep(.ok) { color: var(--cyan); }
.log :deep(.warn) { color: var(--red); }
.log :deep(.cur) {
  display: inline-block;
  width: 7px;
  height: 12px;
  background: var(--cyan);
  vertical-align: -2px;
  animation: cur 1s steps(1) infinite;
}

.kit-tag {
  left: 0;
  top: -18px;
}

@keyframes cur {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .log :deep(.cur) { animation: none; }
}

/* Below the tagline's column on narrow screens it just crowds — drop it. */
@media (max-width: 720px) {
  .boot { display: none; }
}
</style>
