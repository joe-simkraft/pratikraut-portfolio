<script setup lang="ts">
import { provideDecryptContext } from './composables/decryptContext'
import { outline } from './config'
import ProgressRail from './components/ProgressRail.vue'
import HeroSection from './components/HeroSection.vue'
import WorkSection from './components/WorkSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import ScreenOverlay from './components/ScreenOverlay.vue'

// Provided here so every descendant shares one registry, and so nothing
// persists between app instances.
provideDecryptContext(outline)
</script>

<template>
  <a class="skip-link" href="#work">Skip to content</a>

  <ProgressRail />

  <div class="page">
    <HeroSection />
    <main>
      <WorkSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  </div>

  <ScreenOverlay />
</template>

<style scoped>
.page {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  padding: 0 34px 70px 34px;
}

/* Room for the fixed rail on the left at wide sizes. */
@media (min-width: 901px) {
  .page {
    padding-left: 88px;
    padding-right: 40px;
  }
}

@media (max-width: 900px) {
  .page {
    padding-top: 42px;
  }
}

@media (max-width: 620px) {
  .page {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 10;
  background: var(--bg);
  color: var(--fg);
  padding: 10px 16px;
  border: 1px solid var(--cyan);
  font-size: 12px;
}

.skip-link:focus {
  left: 12px;
  top: 12px;
}
</style>
