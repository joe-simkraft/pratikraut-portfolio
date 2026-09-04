<script setup lang="ts">
import { computed } from 'vue'
import { marks } from '../lib/skillIcons'

interface Props {
  /** Key into the brand-mark table. */
  icon: string
}

const props = defineProps<Props>()

const mark = computed(() => marks[props.icon])
</script>

<template>
  <!--
    Decorative: the skill's name sits next to it as real text, so announcing
    the mark as well would just read the same word twice.
  -->
  <svg
    v-if="mark"
    class="mark"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="mark.path" />
  </svg>
</template>

<style scoped>
.mark {
  display: block;
  width: 100%;
  height: 100%;
  /*
    Monochrome until the card hands down a --mark-fill. The whole point of the
    grid is that the brand colour is the reward for pointing at something, so
    the resting fill is deliberately a flat grey rather than the real hue at
    low opacity.
  */
  fill: var(--mark-fill, #55626f);
  transition: fill 340ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .mark {
    transition-duration: 1ms;
  }
}
</style>
