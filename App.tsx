import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { SessionContextProvider } from 'app/session/SessionContext'
import { SWRConfig } from 'swr'
import Navigation from './Navigation'

const App = () => {
  return (
    <SessionContextProvider>
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
