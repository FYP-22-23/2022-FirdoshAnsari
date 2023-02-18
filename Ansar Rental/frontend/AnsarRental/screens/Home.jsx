import Payment from './Payment'
import Profile from './Profile'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Tab = createMaterialBottomTabNavigator()

export default function Home() {
  return (
    <Tab.Navigator screenOptions={{
      lazy: true,
    }}
    >
      <Tab.Screen name='payment' component={Payment}
        options={{ title: 'Payment', tabBarIcon: () => (<Icon name='money' size={24} />) }}
      />
      <Tab.Screen name='profile' component={Profile}
        options={{ title: 'Profile', tabBarIcon: () => (<Icon name='person-outline' size={24} />) }}
      />
    </Tab.Navigator >
  )
}
