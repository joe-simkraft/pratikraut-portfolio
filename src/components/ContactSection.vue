<script setup lang="ts">
import SectionShell from './SectionShell.vue'
import DecryptText from './DecryptText.vue'
import { contact, site } from '../config'
</script>

<template>
  <SectionShell id="contact" label="contact" v-slot="{ revealed }">
    <div class="block">
      <a class="email" :href="`mailto:${contact.email}`">
        <DecryptText
          :text="contact.email"
          :active="revealed"
          :stagger="34"
          :hold="320"
        />
      </a>

      <nav class="links" aria-label="Elsewhere">
        <a
          v-for="(link, i) in contact.links"
          :key="link.label"
          :href="link.href"
          :aria-label="link.label"
          target="_blank"
          rel="noopener"
        >
          <DecryptText
            :text="link.label"
            :active="revealed"
            :delay="300 + i * 120"
            :stagger="24"
          />
        </a>
      </nav>

      <p class="sign">{{ site.owner }} &middot; {{ new Date().getFullYear() }}</p>
    </div>
  </SectionShell>
</template>

<style scoped>
.block {
  padding-bottom: 20px;
}

.email {
  display: inline-block;
  font-size: clamp(17px, 3.2vw, 27px);
  letter-spacing: -0.01em;
  color: var(--fg);
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 5px;
  transition: border-color 200ms ease;
}

.email:hover {
  border-bottom-color: var(--cyan);
}

.email:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 5px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 30px;
}

.links a {
  font-size: 11.5px;
  letter-spacing: 0.14em;
  color: var(--mut);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 3px;
  transition: color 180ms ease, border-color 180ms ease;
}

.links a:hover {
  color: var(--fg);
  border-bottom-color: var(--cyan);
}

.links a:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 4px;
}

.sign {
  margin: 44px 0 0;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--dim);
}

@media (prefers-reduced-motion: reduce) {
  .email,
  .links a {
    transition: none;
  }
}
</style>
