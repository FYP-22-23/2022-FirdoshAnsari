import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton, Text, TextInput } from 'react-native-paper'
import tailwind from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useMutation } from 'react-query'
import { changePassword } from '../core/api/rest_client'
import LoadingIndicator from '../components/LoadingIndicator'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../redux/userSlice'
import Toast from 'react-native-simple-toast'

export default function ChangePasswordModal() {
  const navigation = useNavigation()
  const mutation = useMutation(changePassword)

  const [oldPwText, onChangeOldPw] = useState('')
  const [newPwText, onChangeNewPw] = useState('')
  const [confirmPwText, onChangeConfirmPw] = useState('')

  const user = useSelector(selectCurrentUser)

  function onChangePassword() {
    console.log('pressed')
    if (!oldPwText || !newPwText || !confirmPwText) {
      Toast.show('All fields are required', Toast.SHORT)
      return
    }
    if (confirmPwText !== newPwText) {
      Toast.show('Passwords don\'t match', Toast.SHORT)
      return
    }

    const userId = user.id
    const oldPassword = oldPwText
    const newPassword = newPwText

    mutation.mutate({ userId, oldPassword, newPassword })
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      Toast.show(mutation.data, Toast.LONG)
      navigation.goBack()
      return
    }

    if (mutation.isError) {
      Toast.show(mutation.error.message, Toast.LONG)
      return
    }
  }, [mutation])

  return (
    <View style={tailwind`flex-1 items-center justify-center p-8`}>
      <IconButton icon='minus-circle-outline' style={tailwind`absolute top-2 right-2`} size={32}
        onPress={navigation.goBack}
      />

      <TextInput style={tailwind`w-full p-2 m-2`} value={oldPwText} mode='outlined' dense={true} label='Old Password' secureTextEntry={true} onChangeText={onChangeOldPw} />
      <TextInput style={tailwind`w-full p-2 m-2`} value={newPwText} mode='outlined' dense={true} label='New Password' secureTextEntry={true} onChangeText={onChangeNewPw} />
      <TextInput style={tailwind`w-full p-2 m-2`} value={confirmPwText} mode='outlined' dense={true} label='Confirm Password' secureTextEntry={true} onChangeText={onChangeConfirmPw} />

      <TouchableOpacity style={tailwind`my-8 bg-blue-400 rounded-md`} activeOpacity={.8}>
        <Text variant='bodyLarge' style={tailwind`text-white py-4 px-12`} onPress={onChangePassword}>Change</Text>
      </TouchableOpacity>

      {mutation.isLoading && <LoadingIndicator />}
    </View>
  )
}
