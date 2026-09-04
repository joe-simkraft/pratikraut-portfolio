import { computed, inject, provide, ref, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import type { SectionEntry, SectionOutline } from '../types'

export interface DecryptContext {
  /** Registered sections in document order, for the rail. */
  sections: Ref<SectionEntry[]>
  /** Fraction of sections decrypted, 0 to 1. */
  progress: ComputedRef<number>
  /** True once the visitor has asked to skip the effect entirely. */
  forced: Ref<boolean>
  register: (id: string, label: string) => void
  markRevealed: (id: string) => void
  /** Reveal everything immediately and stop scrambling for the rest of the visit. */
  revealAll: () => void
}

const KEY: InjectionKey<DecryptContext> = Symbol('decrypt')

/**
 * The registry itself, with no Vue injection involved.
 *
 * Split out from `provideDecryptContext` so the progress bookkeeping can be
 * tested directly, without mounting a component.
 */
export function createRegistry(
  initial: readonly SectionOutline[] = [],
): DecryptContext {
  const sections = ref<SectionEntry[]>(
    initial.map((s) => ({ id: s.id, label: s.label, revealed: false })),
  )
  const forced = ref(false)

  const progress = computed(() => {
    const list = sections.value
    if (list.length === 0) return 0
    const done = list.filter((s) => s.revealed).length
    return done / list.length
  })

  function register(id: string, label: string): void {
    if (sections.value.some((s) => s.id === id)) return
    sections.value = [...sections.value, { id, label, revealed: forced.value }]
  }

  function markRevealed(id: string): void {
    const target = sections.value.find((s) => s.id === id)
    if (!target || target.revealed) return
    // Replace rather than mutate so `progress` recomputes.
    sections.value = sections.value.map((s) =>
      s.id === id ? { ...s, revealed: true } : s,
    )
  }

  function revealAll(): void {
    forced.value = true
    sections.value = sections.value.map((s) => ({ ...s, revealed: true }))
  }

  return { sections, progress, forced, register, markRevealed, revealAll }
}

/**
 * Held in a provided context rather than a module singleton so state can't
 * leak between app instances, which matters for SSR and for tests.
 */
export function provideDecryptContext(
  initial: readonly SectionOutline[] = [],
): DecryptContext {
  const context = createRegistry(initial)
  provide(KEY, context)
  return context
}

export function useDecryptContext(): DecryptContext {
  const context = inject(KEY)
  if (!context) throw new Error('useDecryptContext called outside a provider')
  return context
}
