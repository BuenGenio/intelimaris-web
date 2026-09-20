import type { Component } from 'vue'

/** A workspace kind, coloured as the app colours it (DESIGN.md §3). */
export type ScreenKind = 'platform' | 'vessel' | 'marina' | 'private-marina' | 'business' | 'maintenance' | 'account'

export interface ScreenDoor {
  id: string
  label: string
}

export interface ScreenEntry {
  /** unique within the whole registry, kebab-case */
  id: string
  label: string
  /** the app route it stands for, e.g. /w/wanderer/underway */
  path: string
  /** one sentence: what the screen is for */
  summary: string
  /** which door in the shell lights up */
  door?: string
  /** phone by default for account and vessel screens, desktop otherwise */
  frame?: 'phone' | 'desktop'
  load: () => Promise<{ default: Component }>
}

export interface ScreenGroup {
  id: string
  label: string
  kind: ScreenKind
  /** the app that hosts these screens */
  app: 'WaterWayz' | 'WaterWayz Marina' | 'WaterWayz Yard' | 'WaterWayz Business' | 'Operator console'
  frame: 'phone' | 'desktop'
  /** the shell's top-level doors for this kind */
  doors: ScreenDoor[]
  /** the workspace slug shown in the address bar */
  slug: string
  screens: ScreenEntry[]
}
