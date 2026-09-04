export interface Project {
  readonly title: string
  readonly year: string
  readonly stack: readonly string[]
  readonly summary: string
  readonly live?: string
  readonly source?: string
}

export interface Skill {
  /** Display name. */
  readonly name: string
  /** Key into the brand-mark table in `lib/skillIcons`. */
  readonly icon: string
}

export interface SkillGroup {
  /** The category, shown once at the left of the row. */
  readonly label: string
  readonly items: readonly Skill[]
}

export interface ContactLink {
  readonly label: string
  readonly href: string
}

/** A section registered with the decrypt context, for the progress rail. */
export interface SectionEntry {
  readonly id: string
  readonly label: string
  revealed: boolean
}

/** A section as declared in the page outline. */
export interface SectionOutline {
  readonly id: string
  readonly label: string
}
