import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import tailwind from 'twrnc';
import { getLoggedInUser } from '../core/api/rest_client';
import { homeRoute, loginRoute } from '../core/routes';
import { setUser } from '../redux/userSlice';

// import { Container } from './styles';

export default function Onboarding() {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    getLoggedInUser().then((user) => {
      if (user !== null) {
        dispatch(setUser(user))
        navigation.replace(homeRoute)
      }
    })
  }, [])

  return (
    <View style={tailwind`flex-1 justify-center items-center`} >
      <Image source={require('../assets/icon.png')} style={tailwind`w-24 h-24`} />
      <TouchableOpacity style={tailwind`bg-blue-400 w-44 py-4 rounded-md my-8`}
        activeOpacity={.8} onPress={() => navigation.navigate(loginRoute)}>
        <Text style={tailwind`text-white font-bold text-center`}>Login</Text>
      </TouchableOpacity>
    </View >
  )
}
