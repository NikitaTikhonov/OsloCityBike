import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {QueryClient, QueryClientProvider} from 'react-query'
import Toast from 'react-native-toast-message'

import {BikesContextProvider} from './src/data/Bikes'
import {RootRouter} from './src/navigation/rootRouter'

export const SCREENS = {
  MAP: 'Map',
  GRAPH: 'Graph',
}

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <BikesContextProvider>
          <RootRouter />
          <Toast />
        </BikesContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
