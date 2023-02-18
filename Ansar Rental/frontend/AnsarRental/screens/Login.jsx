import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { forgotPasswordRoute, homeRoute } from '../core/routes'
import { login } from '../core/api/rest_client'
import { useMutation } from 'react-query'
import LoadingIndicator from '../components/LoadingIndicator'
import tailwind from 'twrnc'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const mutation = useMutation(login)
  const dispatch = useDispatch()

  function handleLoginPress() {
    if (!email || !password) return;

    mutation.mutate({ email, password })
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      // dispatch(setUser(mutation.data))
      navigation.replace(homeRoute)
    }
  }, [mutation.isSuccess])

  return (
    <View style={tailwind`px-8 justify-center flex-1 items-center`} >
      <Image source={require('../assets/icon.png')} style={tailwind`w-24 h-24`} />
      <TextInput value={email} style={tailwind`bg-white p-4 border rounded-lg my-4 w-full`} onChangeText={setEmail}
        keyboardType='email-address'
        placeholder='Email'
      />
      <TextInput value={password} style={tailwind`bg-white p-4 border rounded-lg w-full mb-4`} secureTextEntry={true}
        keyboardType='visible-password' onChangeText={setPassword}
        placeholder='Password'
      />
      <Text style={tailwind`mb-8 text-blue-400 font-bold text-center`} onPress={() => navigation.navigate(forgotPasswordRoute)}>
        Forgot Password?
      </Text>
      <TouchableOpacity activeOpacity={.8} onPress={handleLoginPress} style={tailwind`bg-blue-400 rounded-md w-44 py-4`}>
        <Text style={tailwind`text-white font-bold text-center`}>Login</Text>
      </TouchableOpacity>
      <Text style={tailwind`text-red-600 text-lg`}>{mutation.error?.message}</Text>
      {(mutation.isLoading) && <LoadingIndicator />}
    </View >
  )

}
