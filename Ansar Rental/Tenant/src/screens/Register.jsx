import React, {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Image, Input, Text} from '../components';
import {Button} from 'react-native-paper'
import {useMutation} from '@tanstack/react-query/build/lib/useMutation';
import {login} from '../api/rest_client';
import {useToast} from 'react-native-toast-notifications';

const isAndroid = Platform.OS === 'android';

const Register = () => {
    const {user, setUser} = useData()
    const navigation = useNavigation();

    useEffect(() => {
        if (user != null)
            navigation.dispatch(StackActions.replace("Menu"))
    }, [])
    const {t} = useTranslation();

    const [isValid, setIsValid] = useState({
        username: false,
        password: false,
    });
    const [registration, setRegistration] = useState({
        username: '',
        password: '',
        agreed: false,
    });
    const {assets, colors, sizes} = useTheme();
    const toast = useToast();

    const handleChange = useCallback(
        (value) => {
            setRegistration((state) => ({...state, ...value}));
        },
        [setRegistration],
    );

    const mutation = useMutation(async () => {
        if (isValid.username && isValid.password) {
            return login(registration.username, registration.password)
        }
        throw 'Username and password is required'
    }, {
        onError: (e) => {
            toast.hideAll();
            toast.show(e.toString(), {type: 'danger'})
        },
        onSuccess: (d) => {
            setUser(d)
            navigation.dispatch(StackActions.replace("Menu"))
        }
    })

    useEffect(() => {
        setIsValid((state) => ({
            ...state,
            username: regex.name.test(registration.username),
            password: regex.name.test(registration.password),
        }));
    }, [registration, setIsValid]);

    return (
        <Block safe marginTop={sizes.md}>
            <Block paddingHorizontal={sizes.s}>
                <Block flex={0} style={{zIndex: 0}}>
                    <Image
                        background
                        resizeMode="cover"
                        padding={sizes.sm}
                        radius={sizes.cardRadius}
                        source={assets.background}
                        height={sizes.height * 0.3}>

                        <Text h4 center white marginBottom={sizes.md}>
                            {t('register.title')}
                        </Text>
                    </Image>
                </Block>
                {/* register form */}
                <Block
                    keyboard
                    behavior={!isAndroid ? 'padding' : 'height'}
                    marginTop={-(sizes.height * 0.2 - sizes.l)}>
                    <Block
                        flex={0}
                        radius={sizes.sm}
                        marginHorizontal="8%"
                        shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    >
                        <>
                            <Block
                                card
                                flex={0}
                                intensity={90}
                                radius={sizes.sm}
                                overflow="hidden"
                                justify="space-evenly"
                                tint={colors.blurTint}
                                paddingVertical={sizes.sm}>
                                {/* form inputs */}
                                <Block paddingHorizontal={sizes.sm}>
                                    <Input
                                        autoCapitalize="none"
                                        marginBottom={sizes.m}
                                        label={t('common.name')}
                                        placeholder={t('common.namePlaceholder')}
                                        success={Boolean(registration.username && isValid.username)}
                                        danger={Boolean(registration.username && !isValid.username)}
                                        onChangeText={(value) => handleChange({username: value})}
                                    />
                                    <Input
                                        // secureTextEntry
                                        autoCapitalize="none"
                                        marginBottom={sizes.m}
                                        label={t('common.password')}
                                        placeholder={t('common.passwordPlaceholder')}
                                        onChangeText={(value) => handleChange({password: value})}
                                        success={Boolean(registration.password && isValid.password)}
                                        danger={Boolean(registration.password && !isValid.password)}
                                    />
                                </Block>
                                <Button
                                    mode="contained-tonal"
                                    loading={mutation.isLoading}
                                    disabled={mutation.isLoading}
                                    onPress={() => {
                                        mutation.mutate()
                                    }}>
                                    <Text bold primary transform="uppercase">
                                        {t('common.signin')}
                                    </Text>
                                </Button>
                            </Block>
                        </>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
};

export default Register;
