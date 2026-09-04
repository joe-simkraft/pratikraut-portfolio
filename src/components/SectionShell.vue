<script setup lang="ts">
import { watch } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useDecryptContext } from '../composables/decryptContext'
import DecryptText from './DecryptText.vue'

interface Props {
  id: string
  label: string
  /** Reveal immediately rather than on scroll. Used for the hero. */
  immediate?: boolean
}

const props = defineProps<Props>()
const { register, markRevealed, forced } = useDecryptContext()

register(props.id, props.label)

const { target, revealed } = useReveal({
  immediate: props.immediate === true || forced.value,
})

/*
 * A single watcher covers both routes to being revealed — the observer firing,
 * and the immediate path taken when IntersectionObserver is unavailable.
 * Reporting from only one of them left the progress rail claiming 0% while the
 * text below it was fully readable.
 */
watch(revealed, (on) => { if (on) markRevealed(props.id) }, { immediate: true })
</script>

<template>
  <section :id="id" ref="target" class="section" :aria-labelledby="`${id}-label`">
    <h2 :id="`${id}-label`" class="heading">
      <DecryptText :text="label" :active="revealed || forced" :stagger="20" />
    </h2>
    <div class="content">
      <slot :revealed="revealed || forced" />
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 84px 0;
  border-top: 1px solid var(--rule);
}

.heading {
  margin: 0 0 26px;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--dim);
}

@media (max-width: 620px) {
  .section {
    padding: 56px 0;
  }
}
</style>
