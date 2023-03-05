import React, { useEffect } from "react";
import { Platform, StatusBar, Text } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme, useNavigation, NavigationActions } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Menu from "./Menu";
import { useData, ThemeProvider, TranslationProvider } from "../hooks";
import Register from "../screens/Register";

const Logout = ()=>{
  const {removeUser} = useData()
  const navigation = useNavigation()

  useEffect(()=>{
    removeUser()
    navigation.navigate('Login')
  },[])
  return null
}

export default () => {
  const { isDark, theme, setTheme } = useData();

  /* set the status bar based on isDark constant */
  useEffect(() => {
    Platform.OS === "android" && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
    return () => {
      StatusBar.setBarStyle("default");
    };
  }, [isDark]);

  // load custom fonts
  const [fontsLoaded] = useFonts({
    "OpenSans-Light": theme.assets.OpenSansLight,
    "OpenSans-Regular": theme.assets.OpenSansRegular,
    "OpenSans-SemiBold": theme.assets.OpenSansSemiBold,
    "OpenSans-ExtraBold": theme.assets.OpenSansExtraBold,
    "OpenSans-Bold": theme.assets.OpenSansBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: "rgba(0,0,0,0)",
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };

  return (
    <TranslationProvider>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator screenOptions={{headerShown: false, animation: "slide_from_right", animationDuration: 3000}} initialRouteName="Login" >
            <Stack.Screen name="Login" component={Register} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Logout" component={Logout} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );
};
