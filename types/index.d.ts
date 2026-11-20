/** A pinned folder: one tab above the prompt, and a place at the top of the Projects pane. */
export type Pin = {
  /** The folder, absolute, as the session that pinned it reported it. */
  folder: string
  /** The text on the tab, and the project's name in the pane. */
  label: string
}

/** One Code session as the desktop app lists it. */
export type SessionRow = {
  id: string
  title: string
  /** The session's working folder. */
  folder: string
  /** A claude:// link that opens the session in the app; null where the app gives none. */
  link: string | null
  isRunning: boolean
  /** ISO time of the session's last activity. */
  lastActivityAt: string
}

/**
 * What a session wants, as the desktop's sidebar dot says: waiting on the
 * person (a permission or a question), finished since they last looked at it,
 * or running. An idle session has none.
 */
export type SessionState = 'waiting' | 'unread' | 'running'

/** How the last read of the session list went. */
export type Probe = {
  ok: boolean
  error: string | null
  at: number
}

declare module 'claude-code' {
  interface PluginState {
    'env-tabs-hugo': {
      pins: Pin[]
      /** The other sessions, as list_sessions answers: it leaves this one out. */
      sessions: SessionRow[]
      /** This session, or null while the app has not said. */
      thisSession: SessionRow | null
      here: string
      /** Projects the person opened or closed in the pane, by their normalized folder. */
      flipped: string[]
      /** Each listed session's state, by its id; an idle session is left out. */
      states: Record<string, SessionState>
      probe: Probe | null
      /** What the person typed in the pane's filter. */
      filter: string
      /** The key of the pinned project whose actions menu is open, or an empty text. */
      menu: string
      /** Whether the band above the prompt shows the pinned projects' tabs. */
      bandOpen: boolean
      /** Sessions the person marked unread in this plugin, by id, with the time of the mark. */
      marks: Record<string, number>
      /** The id of the session whose actions menu is open, or an empty text. */
      sessionMenu: string
      /** Sessions the person marked read in this plugin, by id, with the time of the mark. */
      readMarks: Record<string, number>
    }
  }
}
