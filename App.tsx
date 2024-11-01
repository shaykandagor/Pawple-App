import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useAuth } from 'app/api/auth'
import useSecureStore from 'app/hooks/useSecureStore'
import { SessionContextProvider } from 'app/session/SessionContext'
import { Session, User } from 'app/types/session'
import { SWRConfig } from 'swr'
import Navigation from './Navigation'

const App = () => {
  const { getUserByToken } = useAuth()
  const { value } = useSecureStore('token', undefined)
  const [session, setSession] = useState<Session>({ authenticated: false })
  useEffect(() => {
    if (value) {
      getUserByToken(value)
        .then((user: User) => {
          setSession({ authenticated: true, user, sessionToken: value })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [value])
  return (
    <SessionContextProvider value={{ session, setSession }}>
      <SWRConfig>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Navigation />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SWRConfig>
    </SessionContextProvider>
  )
}

export default App
