import { useAuth } from 'app/api/auth'
import useSecureStore from 'app/hooks/useSecureStore'
import { Session } from 'app/types/session'
import React, { PropsWithChildren, useEffect, useState } from 'react'

export const SessionContext = React.createContext<{
  session: Session
  setSession: (session: Session) => void
  logOut: () => void
}>({
  session: {
    authenticated: false
  },
  setSession: () => {},
  logOut: () => {}
})
export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const { getUserByToken } = useAuth()
  const { value, setValue } = useSecureStore('token', undefined)
  const [session, setSession] = useState<Session>({ authenticated: false })
  const logOut = () => {
    setValue(undefined)
    setSession({ authenticated: false, user: undefined, sessionToken: undefined })
  }
  useEffect(() => {
    if (value) {
      getUserByToken(value)
        .then((res) => {
          const user = res.data
          setSession({ authenticated: true, user, sessionToken: value })
        })
        .catch((_) => {
          setValue(undefined)
        })
    } else {
      setSession({ authenticated: false, user: undefined, sessionToken: undefined })
    }
  }, [value])
  return (
    <SessionContext.Provider value={{ session, setSession, logOut }}>
      {children}
    </SessionContext.Provider>
  )
}
