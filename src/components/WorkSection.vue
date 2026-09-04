<script setup lang="ts">
import SectionShell from './SectionShell.vue'
import DecryptText from './DecryptText.vue'
import { projects } from '../config'
</script>

<template>
  <SectionShell id="work" label="selected work" v-slot="{ revealed }">
    <ol class="list">
      <li v-for="(project, i) in projects" :key="project.title" class="item">
        <span class="idx" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>

        <div class="body">
          <h3 class="name">
            <!-- Rows stagger, so scrolling feels like it's driving the resolve. -->
            <DecryptText
              :text="project.title"
              :active="revealed"
              :delay="i * 150"
              :stagger="30"
            />
          </h3>

          <p class="summary">
            <DecryptText
              :text="project.summary"
              :active="revealed"
              :delay="i * 150 + 200"
              :stagger="5"
              :hold="200"
              :jitter="240"
            />
          </p>

          <ul class="stack">
            <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
          </ul>

          <p v-if="project.live || project.source" class="links">
            <a v-if="project.live" :href="project.live" target="_blank" rel="noopener">live &nearr;</a>
            <a v-if="project.source" :href="project.source" target="_blank" rel="noopener">source &nearr;</a>
          </p>
        </div>

        <span class="year">{{ project.year }}</span>
      </li>
    </ol>
  </SectionShell>
</template>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  display: grid;
  grid-template-columns: 38px 1fr 68px;
  gap: 18px;
  padding: 26px 0;
  border-bottom: 1px solid var(--rule);
}

.item:last-child {
  border-bottom: none;
}

.idx,
.year {
  font-size: 10px;
  color: var(--dim);
  padding-top: 5px;
  letter-spacing: 0.1em;
}

.year {
  text-align: right;
}

.name {
  margin: 0;
  font-size: clamp(16px, 2.4vw, 20px);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--fg);
}

.summary {
  margin: 12px 0 0;
  max-width: 60ch;
  font-size: 13px;
  line-height: 1.8;
  color: var(--mut);
}

.stack {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 15px 0 0;
  padding: 0;
}

.stack li {
  font-size: 9.5px;
  letter-spacing: 0.09em;
  color: var(--mut);
  border: 1px solid var(--rule);
  border-radius: 2px;
  padding: 3px 8px;
}

.links {
  display: flex;
  gap: 18px;
  margin: 16px 0 0;
}

.links a {
  font-size: 11px;
  letter-spacing: 0.09em;
  color: var(--mut);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: color 180ms ease, border-color 180ms ease;
}

.links a:hover {
  color: var(--fg);
  border-bottom-color: var(--cyan);
}

.links a:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 3px;
}

@media (max-width: 620px) {
  .item {
    grid-template-columns: 26px 1fr;
  }

  .year {
    grid-column: 2;
    text-align: left;
    padding-top: 0;
    margin-top: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .links a {
    transition: none;
  }
}
</style>
