<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import GlitchTitle from './GlitchTitle.vue'
import DecryptText from './DecryptText.vue'
import { useDecryptContext } from '../composables/decryptContext'
import { site } from '../config'

const { markRevealed, forced } = useDecryptContext()

// The hero is above the fold, so it resolves on mount rather than on scroll.
const started = ref(false)
onMounted(() => {
  started.value = true
})

watch(
  () => started.value || forced.value,
  (on) => { if (on) markRevealed('top') },
  { immediate: true },
)

const active = computed(() => started.value || forced.value)
</script>

<template>
  <header id="top" class="hero">
    <GlitchTitle
      :text="site.domain"
      :active="active"
      :cycle-every="site.titleHold"
    />

    <p class="role">
      <DecryptText :text="site.role" :active="active" :delay="420" :stagger="30" />
    </p>

    <p class="tagline">
      <DecryptText
        :text="site.tagline"
        :active="active"
        :delay="700"
        :stagger="7"
        :hold="220"
        :jitter="260"
      />
    </p>

    <p class="cue" aria-hidden="true">&darr; scroll to decrypt</p>
  </header>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 90px 0 64px;
}

.role {
  margin: 20px 0 0;
  font-size: 12px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--mut);
}

.tagline {
  margin: 30px 0 0;
  max-width: 56ch;
  font-size: clamp(13px, 1.7vw, 15px);
  line-height: 1.85;
  color: var(--mut);
}

.cue {
  margin: 54px 0 0;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--dim);
}

@media (max-width: 620px) {
  .hero {
    padding: 74px 0 48px;
  }
}
</style>
