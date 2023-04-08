import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Profile} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import Register from '../screens/Register';
import Bills from '../screens/Bills';
import Payment from '../screens/Payment';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Bills"
        component={Bills}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name="Payments"
        component={Payment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
