import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import Navigation from './Navigation'
import { SWRConfig } from 'swr'
import { SessionContextProvider } from 'app/session/SessionContext'
import { Session } from 'app/types/session'
import useSecureStore from 'app/hooks/useSecureStore'
import { useAuth } from 'app/api/auth'

const App = () => {
  const { getUserByToken } = useAuth()
  const { value, setValue } = useSecureStore('token', undefined)
  const [session, setSession] = useState<Session>({ authenticated: false })
  useEffect(() => {
    if (value) {
      getUserByToken(value)
        .then((user) => {
          setSession({ authenticated: true })
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
