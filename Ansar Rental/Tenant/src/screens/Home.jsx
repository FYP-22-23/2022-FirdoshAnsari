import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Input} from '../components';
import React, {useState, useEffect, useRef} from 'react';
import * as Notifications from 'expo-notifications';

import Constants from 'expo-constants';
import {Platform} from 'react-native';
import {makePayment, setFcmToken} from '../api/rest_client';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const Home = () => {
    const {t} = useTranslation();
    const {colors, sizes} = useTheme();

    const {user, setUser} = useData()

    useEffect(() => {
        // Esewa.init('JB0BBQ4aD0UqIThFJwAKBgAXEUkEGQUBBAwdOgABHD4DChwUAB0R','BhwIWQQADhIYSxILExMcAgFXFhcOBwAKBgAXEQ==');
        // if(!('fcm_token' in user.user) || user.user.fcm_token === ''){
        // console.log(user)
        registerForPushNotificationsAsync().then(token => {
            setFcmToken(user.user._id, token).then(u => {
                user.fcm_token = u.fcm_token
                setUser(user);
            })
        });
        // }

        // This listener is fired whenever a notification is received while the app is foregrounded
        const notificationListener = Notifications.addNotificationReceivedListener(async (notification) => {
            // makePayment( )
            console.log('You clicked on notification')
            // setNotification(notification);`
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    return (
        <Block>
            {/* search input */}
            <Block color={colors.card} flex={0} padding={sizes.padding}>
                <Input search placeholder={t('common.search')}/>
            </Block>

            {/* products list */}
            <Block
                scroll
                paddingHorizontal={sizes.padding}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: sizes.l}}>
            </Block>
        </Block>
    );
};

export default Home;
