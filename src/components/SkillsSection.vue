<script setup lang="ts">
import SectionShell from './SectionShell.vue'
import DecryptText from './DecryptText.vue'
import SkillIcon from './SkillIcon.vue'
import { marks, toRgbTriplet } from '../lib/skillIcons'
import { skills } from '../config'
import type { Skill } from '../types'

/**
 * Flat running index across all groups, so the whole grid resolves as one
 * left-to-right sweep rather than every group starting over at zero.
 */
const offsets: number[] = []
let running = 0
for (const group of skills) {
  offsets.push(running)
  running += group.items.length
}

/**
 * Brand colour comes off the mark rather than out of the config, so a skill is
 * described in one place and coloured in another — no chance of the two
 * drifting apart.
 */
function brand(skill: Skill): string {
  return toRgbTriplet(marks[skill.icon]?.color ?? '#55626f')
}
</script>

<template>
  <SectionShell id="skills" label="skills" v-slot="{ revealed }">
    <dl class="groups">
      <div v-for="(group, g) in skills" :key="group.label" class="group">
        <dt class="glabel">
          <DecryptText
            :text="group.label"
            :active="revealed"
            :delay="g * 90"
            :stagger="22"
          />
        </dt>
        <dd class="gitems">
          <!--
            Cards aren't focusable. The colour reveal is decoration — the name
            is real text either way — so making every tile a tab stop would
            cost keyboard users more than it gives them. Touch, which has no
            hover, gets the colour outright further down.
          -->
          <ul>
            <li
              v-for="(skill, i) in group.items"
              :key="skill.name"
              class="card"
              :style="{ '--brand-rgb': brand(skill) }"
            >
              <span class="sweep" aria-hidden="true" />
              <span class="frame" aria-hidden="true" />
              <span class="glow" aria-hidden="true" />

              <span class="badge">
                <SkillIcon :icon="skill.icon" />
              </span>

              <span class="name">
                <DecryptText
                  :text="skill.name"
                  :active="revealed"
                  :delay="150 + (offsets[g] + i) * 55"
                  :stagger="24"
                  :hold="240"
                  :jitter="120"
                />
              </span>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </SectionShell>
</template>

<style scoped>
.groups {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.group {
  display: grid;
  grid-template-columns: 148px 1fr;
  gap: 20px;
  padding: 17px 0;
  border-bottom: 1px solid var(--rule);
}

.group:last-child {
  border-bottom: none;
}

.glabel {
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--dim);
  /* Sits on the baseline of the first row of cards. */
  padding-top: 10px;
}

.gitems {
  margin: 0;
}

.gitems ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Each card is only as wide as its mark and its name — no grid track to fill,
   so the row keeps the density of the tag list it replaces. */
.card {
  --brand: rgb(var(--brand-rgb));

  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 11px 5px 6px;
  overflow: hidden;
  border: 1px solid var(--rule);
  border-radius: 3px;
  background:
    linear-gradient(
      150deg,
      rgba(233, 238, 244, 0.035) 0%,
      rgba(233, 238, 244, 0) 62%
    ),
    rgba(233, 238, 244, 0.012);
  transition:
    transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 380ms ease;
}

.card:hover {
  --mark-fill: var(--brand);

  transform: translateY(-2px);
  background-color: rgba(233, 238, 244, 0.035);
}

/* Hairline that runs across the top edge on hover — the one moving part. */
.sweep {
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgb(var(--brand-rgb) / 0.9),
    rgb(var(--brand-rgb) / 0)
  );
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
}

.card:hover .sweep {
  transform: scaleX(1);
}

/*
  The tinted border is its own overlay rather than a border-color swap, so the
  card keeps its neutral 1px rule underneath and nothing shifts by a subpixel
  when the tint fades in.
*/
.frame {
  position: absolute;
  inset: 0;
  border: 1px solid rgb(var(--brand-rgb) / 0.5);
  border-radius: 3px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 340ms ease;
}

/* Sized and placed to bloom from behind the mark. */
.glow {
  position: absolute;
  top: -34px;
  left: -28px;
  width: 100px;
  height: 100px;
  background: radial-gradient(
    circle at center,
    rgb(var(--brand-rgb) / 0.55),
    rgb(var(--brand-rgb) / 0) 66%
  );
  opacity: 0;
  pointer-events: none;
  transition: opacity 420ms ease;
}

.card:hover .frame {
  opacity: 1;
}

.card:hover .glow {
  opacity: 0.34;
}

.badge {
  display: block;
  flex: none;
  width: 22px;
  height: 22px;
  padding: 3px;
  border-radius: 2px;
  background: rgba(5, 7, 10, 0.55);
}

.name {
  font-size: 11.5px;
  letter-spacing: 0.05em;
  color: var(--mut);
  transition: color 340ms ease;
}

.card:hover .name {
  color: var(--fg);
}

/* No hover to reward, so the marks just wear their colours. */
@media (hover: none) {
  .card {
    --mark-fill: var(--brand);
  }

  .card .frame {
    opacity: 0.26;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .sweep,
  .frame,
  .glow,
  .name {
    transition-duration: 1ms;
  }

  .card:hover {
    transform: none;
  }
}

@media (max-width: 620px) {
  .group {
    grid-template-columns: 1fr;
    gap: 11px;
  }

  .glabel {
    padding-top: 0;
  }
}
</style>
