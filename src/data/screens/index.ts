import type { ScreenEntry, ScreenGroup } from './types'
import { ACCOUNT } from './account'
import { VESSEL } from './vessel'
import { VESSEL_CARE } from './vessel-care'
import { MARINA } from './marina'
import { MARINA_OFFICE } from './marina-office'
import { MARINA_OPS } from './marina-ops'
import { YARD } from './yard'
import { BUSINESS } from './business'
import { ADMIN } from './admin'
import { ADMIN_OPS } from './admin-ops'

export type { ScreenEntry, ScreenGroup } from './types'

/** In the order a person meets them: the account, the vessel, the shore, the console. */
export const SCREEN_GROUPS: ScreenGroup[] = [ACCOUNT, VESSEL, VESSEL_CARE, MARINA, MARINA_OFFICE, MARINA_OPS, YARD, BUSINESS, ADMIN, ADMIN_OPS].filter((g) => g.screens.length > 0)

export const ALL_SCREENS: ScreenEntry[] = SCREEN_GROUPS.flatMap((g) => g.screens)

export const findScreen = (id: string | undefined): ScreenEntry | undefined =>
  id ? ALL_SCREENS.find((s) => s.id === id) : undefined

export const groupOf = (id: string): ScreenGroup | undefined => SCREEN_GROUPS.find((g) => g.screens.some((s) => s.id === id))
