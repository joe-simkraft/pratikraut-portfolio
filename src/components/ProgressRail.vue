<script setup lang="ts">
import { computed } from 'vue'
import { useDecryptContext } from '../composables/decryptContext'

const { sections, progress, forced, revealAll } = useDecryptContext()

const percent = computed(() => Math.round(progress.value * 100))
const allDone = computed(() => progress.value >= 1)
</script>

<template>
  <aside class="rail" aria-label="Page progress">
    <span class="pct">{{ percent }}%</span>

    <ol class="dots">
      <li v-for="section in sections" :key="section.id">
        <a
          :href="`#${section.id}`"
          :class="{ on: section.revealed }"
          :aria-label="`Jump to ${section.label}`"
          :aria-current="section.revealed ? 'true' : undefined"
        >
          <i aria-hidden="true"></i>
          <span class="name">{{ section.label }}</span>
        </a>
      </li>
    </ol>

    <!--
      An escape hatch. Anyone who finds the effect tiresome, or who just wants
      to read the page, can turn it off in one click.
    -->
    <button
      v-if="!allDone && !forced"
      type="button"
      class="skip"
      @click="revealAll"
    >
      decrypt all
    </button>
    <span v-else class="done" aria-hidden="true">complete</span>
  </aside>
</template>

<style scoped>
.rail {
  position: fixed;
  top: 50%;
  left: 26px;
  transform: translateY(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  font-size: 9.5px;
  letter-spacing: 0.16em;
}

.pct {
  color: var(--mut);
  font-variant-numeric: tabular-nums;
}

.dots {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.dots a {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  color: var(--dim);
}

.dots i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--wire);
  flex: none;
  transition: background 300ms ease, box-shadow 300ms ease;
}

.dots a.on i {
  background: var(--cyan);
  box-shadow: 0 0 7px var(--cyan);
}

.name {
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 200ms ease, transform 200ms ease;
  white-space: nowrap;
  text-transform: uppercase;
}

.dots a:hover .name,
.dots a:focus-visible .name {
  opacity: 1;
  transform: none;
  color: var(--mut);
}

.dots a:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 4px;
  border-radius: 2px;
}

.skip {
  font-family: inherit;
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--dim);
  background: transparent;
  border: 1px solid var(--rule);
  border-radius: 2px;
  padding: 5px 8px;
  cursor: pointer;
  writing-mode: vertical-rl;
}

.skip:hover {
  color: var(--fg);
  border-color: var(--mut);
}

.skip:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 3px;
}

.done {
  color: var(--dim);
  writing-mode: vertical-rl;
  font-size: 9px;
}

/* On narrow screens the rail becomes a hairline progress bar at the top. */
@media (max-width: 900px) {
  .rail {
    position: fixed;
    inset: 0 0 auto 0;
    transform: none;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 10px 18px;
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid var(--rule);
  }

  .dots {
    flex-direction: row;
    gap: 9px;
    flex: 1;
  }

  .name {
    display: none;
  }

  .skip,
  .done {
    writing-mode: horizontal-tb;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dots i,
  .name {
    transition: none;
  }
}
</style>
