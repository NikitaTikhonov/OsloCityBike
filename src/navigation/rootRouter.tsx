import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {MapScreen} from '../MapScreen'
import {GraphScreen} from '../GraphScreen'
import {SCREENS} from '../../App'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export const RootRouter: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.MAP}
      screenOptions={({route}) => ({
        tabBarIcon: ({size, focused}) => {
          let iconName

          if (route.name === SCREENS.MAP) {
            iconName = 'map-outline'
          } else {
            iconName = 'bar-chart-outline'
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          )
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}>
      <Tab.Screen name={SCREENS.MAP} component={MapScreen} />
      <Tab.Screen name={SCREENS.GRAPH} component={GraphScreen} />
    </Tab.Navigator>
  )
}
