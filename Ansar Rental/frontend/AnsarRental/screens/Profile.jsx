import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button, ScrollView, TextInput, Modal, StyleSheet } from "react-native";
import { Avatar, Dialog } from "react-native-paper";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import tailwind from "twrnc";
import LoadingIndicator from "../components/LoadingIndicator";
import { logout } from "../core/api/rest_client";
import { changePasswordModalRoute, onboardingRoute } from "../core/routes";
import { removeUser, selectCurrentUser } from "../redux/userSlice";
import Toast from 'react-native-simple-toast'


export default function Profile() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [name, setName] = useState('')

  const mutation = useMutation(logout)

  const navigation = useNavigation()
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  function onLogout() {
    mutation.mutate()
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch(removeUser)
      navigation.navigate(onboardingRoute)
      return
    }

    if (mutation.isError) {
      Toast.show(mutation.error, Toast.LONG)
    }
  }, [mutation])

  return (
    <View style={tailwind`pt-16 flex-1`}>
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
          <View style={{ height: 200, backgroundColor: "#3d3d3e", borderRadius: 8, margin: 8, justifyContent: "center", alignItems: "center" }}>
            <Avatar.Text label={user.name[0].toUpperCase()} size={72} />
            <Text style={{ color: "white", fontSize: 24, marginTop: 8 }}>{user.name}</Text>
            <Text style={{ color: "white", marginTop: 4 }}>{user.email}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(changePasswordModalRoute)}>
          <View style={{ height: 60, backgroundColor: "#cccccc", borderRadius: 8, margin: 8, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "black" }}>Change Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout}>
          <View style={{ height: 60, backgroundColor: "#cccccc", borderRadius: 8, margin: 8, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "black" }}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)} >
        <Dialog.Content style={tailwind`items-center`}>
          <Text style={tailwind`text-lg font-bold pb-8`}>Update Profile</Text>
          <TextInput value={name} onChangeText={setName} style={tailwind`w-full p-4 bg-gray-400 rounded-md`} placeholder='Name' />
          <TouchableOpacity style={tailwind`w-52 bg-blue-600 items-center py-2 mt-8 rounded-md`} activeOpacity={.8}>
            <Text style={tailwind`text-white text-lg`}>Update</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      {mutation.isLoading && <LoadingIndicator />}
    </View>
  )
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20
  },
  formContainer: {
    width: '80%',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray'
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
});
