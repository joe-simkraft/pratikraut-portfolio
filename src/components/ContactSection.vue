<script setup lang="ts">
import SectionShell from './SectionShell.vue'
import DecryptText from './DecryptText.vue'
import HexRail from './kit/HexRail.vue'
import FooterWave from './kit/FooterWave.vue'
import { contact, site } from '../config'

// NEW svg assets (src/assets/svg) inlined as raw markup so they inherit the
// link colour via currentColor and go cyan on hover like the text does.
import iconGithub from '../assets/svg/icon-github.svg?raw'
import iconLinkedin from '../assets/svg/icon-linkedin.svg?raw'
import iconCv from '../assets/svg/icon-cv.svg?raw'
import iconMail from '../assets/svg/icon-mail.svg?raw'
import iconExternal from '../assets/svg/icon-external.svg?raw'
import monogramUrl from '../assets/svg/monogram.svg'

const linkIcons: Record<string, string> = {
  github: iconGithub,
  linkedin: iconLinkedin,
  cv: iconCv,
}
const iconFor = (label: string): string => linkIcons[label] ?? iconExternal

/*
 * Brand colours revealed on hover, mirroring the skills grid. GitHub's mark is
 * monochrome (#181717 — invisible here), so its "brand colour" on a dark ground
 * is white, matching how GitHub renders its own mark.
 */
const brandColors: Record<string, string> = {
  github: '#ffffff',
  linkedin: '#0a66c2',
}
const brandStyle = (label: string): Record<string, string> =>
  brandColors[label] ? { '--brand': brandColors[label] } : {}
</script>

<template>
  <SectionShell id="contact" label="contact" divider="a">
    <template #bg>
      <FooterWave />
    </template>

    <template #default="{ revealed }">
    <div class="contact-grid">
      <div class="block">
        <div class="emails">
          <a
            v-for="(em, i) in contact.emails"
            :key="em"
            class="email"
            :href="`mailto:${em}`"
          >
            <span class="ico" aria-hidden="true" v-html="iconMail"></span>
            <DecryptText
              :text="em"
              :active="revealed"
              :stagger="34"
              :hold="320"
              :delay="i * 160"
            />
          </a>
        </div>

        <nav class="links" aria-label="Elsewhere">
          <a
            v-for="(link, i) in contact.links"
            :key="link.label"
            :href="link.href"
            :aria-label="link.label"
            :style="brandStyle(link.label)"
            target="_blank"
            rel="noopener"
          >
            <span class="ico" aria-hidden="true" v-html="iconFor(link.label)"></span>
            <DecryptText
              :text="link.label"
              :active="revealed"
              :delay="300 + i * 120"
              :stagger="24"
            />
          </a>
        </nav>

        <p class="sign">
          <img class="mark" :src="monogramUrl" alt="" width="22" height="22" />
          {{ site.owner }} &middot; {{ new Date().getFullYear() }}
        </p>
      </div>

      <!-- Kit #10 — hex rail as the section's right column. -->
      <HexRail />
    </div>
    </template>
  </SectionShell>
</template>

<style scoped>
.contact-grid {
  display: grid;
  gap: 32px;
}

/* Contact details on the left, hex rail on the right. */
@media (min-width: 820px) {
  .contact-grid {
    grid-template-columns: minmax(0, 1fr) 220px;
    align-items: center;
    gap: 48px;
  }
}

.block {
  padding-bottom: 20px;
}

.emails {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.email {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(16px, 2.8vw, 24px);
  letter-spacing: -0.01em;
  color: var(--fg);
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 5px;
  transition: border-color 200ms ease;
}

/* Inline icon inherits the link's text colour (currentColor). */
.ico {
  display: inline-flex;
  flex: none;
  color: currentColor;
}
.ico :deep(svg) { display: block; width: 1em; height: 1em; }
.email .ico :deep(svg) { width: 22px; height: 22px; color: var(--cyan); }
.links .ico :deep(svg) { width: 15px; height: 15px; }

.email:hover {
  border-bottom-color: var(--cyan);
}

.email:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 5px;
}

.links {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 30px;
}

.links .svg-tag { top: -20px; left: 0; }

.links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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

/* Icon reveals the tech's real brand colour on hover, like the skills grid. */
.links a:hover .ico :deep(svg) {
  color: var(--brand, var(--cyan));
}
.links a:hover {
  border-bottom-color: var(--brand, var(--cyan));
}

.links a:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 4px;
}

.sign {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 44px 0 0;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--dim);
}
.sign .svg-tag { top: -18px; left: 0; }
.sign .mark { border-radius: 5px; }

@media (prefers-reduced-motion: reduce) {
  .email,
  .links a {
    transition: none;
  }
}
</style>
