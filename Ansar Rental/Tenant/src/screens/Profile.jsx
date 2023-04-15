import React, {useState} from 'react';
import {Platform} from 'react-native';
import {Button, Dialog, TextInput} from 'react-native-paper'

import {Block, Image, Text} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';
import {useToast} from "react-native-toast-notifications";
import {useMutation} from "@tanstack/react-query";
import {changePassword} from "../api/rest_client";

const isAndroid = Platform.OS === 'android';

const Profile = () => {
    const toast = useToast()
    const {t} = useTranslation();
    const [cpDialogVisible, setCpDialogVisible] = useState(false)
    // const navigation = useNavigation();
    const {assets, colors, sizes} = useTheme();
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const changePasswordMutation = useMutation({
        mutationFn: () => changePassword(oldPassword, newPassword, confirmNewPassword),
        onSuccess: data => {
            toast.show(data.toString(), {type: 'success'})
            setCpDialogVisible(false)
        },
        onError: err => toast.show(err.toString(), {type: 'danger'}),
    })

    const {user} = useData()

    const [newPasswordVisible, setNewPasswordVisible] = useState(false)
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false)

    function flipNewPassword() {
        setNewPasswordVisible(!newPasswordVisible)
    }

    function flipOldPassword() {
        setOldPasswordVisible(!oldPasswordVisible)
    }

    function flipConfirmNewPassword() {
        setConfirmNewPasswordVisible(!confirmNewPasswordVisible)
    }

    if (user === null) return null

    return (<Block safe marginTop={sizes.md}>
        <Block
            scroll
            paddingHorizontal={sizes.s}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: sizes.padding}}>
            <Block flex={0}>
                <Image
                    background
                    resizeMode="cover"
                    padding={sizes.md}
                    paddingBottom={sizes.l}
                    radius={sizes.cardRadius}
                    source={assets.background}>
                </Image>

                {/* profile: stats */}
                <Block
                    flex={0}
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={-sizes.l}
                    marginHorizontal="8%"
                    color="rgba(255,255,255,0.2)">
                    <Block
                        row
                        blur
                        flex={0}
                        intensity={100}
                        radius={sizes.sm}
                        overflow="hidden"
                        tint={colors.blurTint}
                        justify="space-evenly"
                        paddingVertical={sizes.sm}
                        renderToHardwareTextureAndroid>
                        <Block align="center">
                            <Text h5>{user.user.room_no}</Text>
                            <Text>Room Number</Text>
                        </Block>
                        <Block align="center">
                            <Text h5>{user.user.monthly_room_rent}</Text>
                            <Text>Monthly Rent</Text>
                        </Block>
                    </Block>
                    <Block
                        row
                        blur
                        flex={0}
                        intensity={100}
                        radius={sizes.sm}
                        overflow="hidden"
                        tint={colors.blurTint}
                        justify="space-evenly"
                        paddingVertical={sizes.sm}
                        renderToHardwareTextureAndroid>
                        <Block align="center">
                            <Text h5>{user.user.name}</Text>
                            <Text>Name</Text>
                        </Block>
                        <Block align="center">
                            <Text h5>{user.user.phone_number}</Text>
                            <Text>Number</Text>
                        </Block>
                    </Block>
                    <Block
                        row
                        blur
                        flex={0}
                        intensity={100}
                        radius={sizes.sm}
                        overflow="hidden"
                        tint={colors.blurTint}
                        justify="space-evenly"
                        paddingVertical={sizes.sm}
                        renderToHardwareTextureAndroid>
                        <Block align="center">
                            <Text h5>{user.user.email}</Text>
                            <Text>Email</Text>
                        </Block>
                    </Block>
                </Block>
                <Button style={{margin: 8}} mode='contained-tonal' onPress={() => setCpDialogVisible(true)}>Change
                    Password</Button>
            </Block>
        </Block>
        <Dialog visible={cpDialogVisible} onDismiss={() => setCpDialogVisible(false)}>
            <Dialog.Title>Change Password</Dialog.Title>
            <Dialog.Content>
                <TextInput
                    label="Old Password"
                    onChangeText={(t) => setOldPassword(t)}
                    value={oldPassword}
                    placeholder="Old Password"
                    key='password'
                    secureTextEntry={oldPasswordVisible}
                    right={<TextInput.Icon icon={oldPasswordVisible ? "eye" : "eye-off"}
                                           onPress={() => flipOldPassword()}/>}
                    color={(_) => 'black'}
                />
                <TextInput
                    label="New Password"
                    value={newPassword}
                    onChangeText={(t) => setNewPassword(t)}
                    right={<TextInput.Icon icon={newPasswordVisible ? "eye" : "eye-off"}
                                           onPress={() => flipNewPassword()}/>}
                    placeholder="New Password"
                    key='new_password'
                    secureTextEntry={newPasswordVisible}
                    color={(_) => 'black'}
                />
                <TextInput
                    key='confirm_password'
                    value={confirmNewPassword}
                    onChangeText={(t) => setConfirmNewPassword(t)}
                    right={<TextInput.Icon icon={confirmNewPasswordVisible ? "eye" : "eye-off"}
                                           onPress={() => flipConfirmNewPassword()}/>}
                    label="Confirm New Password"
                    placeholder="Confirm New Password"
                    secureTextEntry={confirmNewPasswordVisible}
                    color={(_) => 'black'}
                />
                <Button style={{marginTop: 12, padding: 4}} mode='contained-tonal'
                        loading={changePasswordMutation.isLoading}
                        disabled={changePasswordMutation.isLoading} onPress={() => {
                    if (oldPassword.length === 0) return toast.show('old password is required', {type: 'warning'})
                    if (newPassword !== confirmNewPassword) return toast.show('Passwords don\'t match', {type: 'warning'})
                    changePasswordMutation.mutate()
                }}>Change Password</Button>
            </Dialog.Content>
        </Dialog>
    </Block>);
};

export default Profile;
