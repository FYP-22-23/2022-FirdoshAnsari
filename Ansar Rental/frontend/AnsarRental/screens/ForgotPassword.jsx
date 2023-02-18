import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useMutation } from 'react-query'
import { sendPasswordResetEmail } from '../core/api/rest_client'
import LoadingIndicator from '../components/LoadingIndicator'
import tailwind from 'twrnc'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const mutation = useMutation(sendPasswordResetEmail)

  function onSendEmail() {
    if (!email) return;
    mutation.mutate(email)
  }

  return (
    <View style={tailwind`flex-1 justify-center items-center px-4`}>
      <TextInput placeholder='Email' style={tailwind`mb-8 w-full bg-white rounded-md p-4`}
        keyboardType='email-address'
        value={email} onChangeText={setEmail}
      />
      <TouchableOpacity activeOpacity={.8} style={tailwind`p-4 bg-blue-400 rounded-md`} onPress={onSendEmail}>
        <Text style={tailwind`text-white font-bold`}>Send password reset email</Text>
      </TouchableOpacity>
      <Text style={tailwind`text-green-400 text-lg`}>{mutation.data?.message}</Text>
      <Text style={tailwind`text-red-400 text-lg`}>{mutation.error?.message}</Text>
      {mutation.isLoading && <LoadingIndicator />}
    </View>
  )

}
