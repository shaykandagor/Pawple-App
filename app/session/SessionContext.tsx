import { Session } from 'app/types/session'
import React from 'react'

export const SessionContext = React.createContext<{
  session: Session
  setSession: (session: Session) => void
}>({
  session: {
    authenticated: false
  },
  setSession: () => {}
})
export const SessionContextProvider = SessionContext.Provider
