import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import ApiConfigProvider from 'app/api/ApiConfigProvider'
import { SessionContextProvider } from 'app/session/SessionContext'
import Navigation from './Navigation'

const App = () => {
  return (
    <SessionContextProvider>
      <ApiConfigProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Navigation />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ApiConfigProvider>
    </SessionContextProvider>
  )
}

export default App
