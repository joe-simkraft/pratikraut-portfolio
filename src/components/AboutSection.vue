<script setup lang="ts">
import SectionShell from './SectionShell.vue'
import DecryptText from './DecryptText.vue'
import Oscilloscope from './kit/Oscilloscope.vue'
import { about } from '../config'
</script>

<template>
  <SectionShell id="about" label="about" divider="c">
    <template #default="{ revealed }">
    <div class="about-grid">
      <div class="prose">
        <p v-for="(para, i) in about" :key="i">
          <!--
            Body copy uses a fast, fine-grained resolve: small stagger and a
            short hold, so a paragraph is readable in well under a second.
            A slow character-by-character reveal on this much text would just
            be an obstacle between the visitor and the content.
          -->
          <DecryptText
            :text="para"
            :active="revealed"
            :delay="i * 260"
            :stagger="4"
            :hold="180"
            :jitter="280"
          />
        </p>
      </div>

      <!-- Kit #09 — fills the right of the widened column as a real panel. -->
      <Oscilloscope />
    </div>
    </template>
  </SectionShell>
</template>

<style scoped>
.about-grid {
  display: grid;
  gap: 32px;
}

/* Prose on the left, scope panel on the right, so the section fills the width
   instead of stranding the text with a far-off decoration. */
@media (min-width: 820px) {
  .about-grid {
    grid-template-columns: minmax(0, 1fr) 240px;
    align-items: center;
    gap: 48px;
  }
}

.prose {
  max-width: 62ch;
}

.prose p {
  margin: 0 0 20px;
  font-size: 13.5px;
  line-height: 1.9;
  color: var(--mut);
}

.prose p:last-child {
  margin-bottom: 0;
}
</style>
