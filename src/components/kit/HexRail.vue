<script setup lang="ts">
/* Kit #10 — hex-dump rail. A hex-editor strip (offset · bytes · ascii) with a
   few bytes lit cyan. Generated once, static. */
import { onMounted, ref } from 'vue'

const host = ref<HTMLElement | null>(null)
const rows = 16

onMounted(() => {
  const el = host.value
  if (!el) return
  const hx = '0123456789abcdef'
  let out = ''
  for (let r = 0; r < rows; r++) {
    const off = (r * 16).toString(16).padStart(4, '0')
    let bytes = ''
    let ascii = ''
    for (let b = 0; b < 6; b++) {
      const v = Math.floor(Math.random() * 256)
      const pair = hx[v >> 4] + hx[v & 15]
      const hot = Math.random() < 0.12
      bytes += hot ? `<span class="hi">${pair}</span> ` : pair + ' '
      const ch = v >= 33 && v <= 126 ? String.fromCharCode(v) : '.'
      ascii += ch === '<' ? '&lt;' : ch
    }
    out += `<span class="off">${off}</span>  ${bytes} <span class="as">${ascii}</span>\n`
  }
  el.innerHTML = out
})
</script>

<template>
  <div class="hexrail" aria-hidden="true">
    <pre ref="host" class="dump"></pre>  </div>
</template>

<style scoped>
.hexrail {
  position: relative;
  pointer-events: none;
  opacity: 0.7;
}

.dump {
  margin: 0;
  font-family: var(--mono);
  font-size: 10.5px;
  line-height: 1.75;
  white-space: pre;
  color: var(--mut);
}

.dump :deep(.off) { color: var(--dim); }
.dump :deep(.hi) { color: var(--cyan); }
.dump :deep(.as) { color: var(--dim); }

.kit-tag {
  left: -6px;
  top: -20px;
}

@media (max-width: 819px) {
  .hexrail { display: none; }
}
</style>
