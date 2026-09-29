<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import GlitchTitle from './GlitchTitle.vue'
import DecryptText from './DecryptText.vue'
import BootLog from './kit/BootLog.vue'
import { useDecryptContext } from '../composables/decryptContext'
import { site } from '../config'

// NEW svg assets (animated, self-contained) loaded as URLs for <img>.
import scrollCueUrl from '../assets/svg/scroll-cue.svg'

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
    <div class="hero-inner">
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

      <div class="cue" aria-hidden="true">
        <img :src="scrollCueUrl" width="20" alt="" />
        <span class="cue-txt">scroll to decrypt</span>
      </div>
    </div>

    <BootLog />
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 90px 0 64px;
}

/* Keeps the title / copy above the grid + HUD decorations. */
.hero-inner {
  position: relative;
  z-index: 1;
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
  position: relative;
  margin: 54px 0 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--dim);
}
.cue .svg-tag { top: -18px; left: 0; }
.cue-txt { color: var(--dim); }

@media (max-width: 620px) {
  .hero {
    padding: 74px 0 48px;
  }
}
</style>
