import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { changePasswordModalRoute, forgotPasswordRoute, homeRoute, loginRoute, onboardingRoute } from './core/routes';
import ChangePasswordModal from './modals/ChangePasswordModal';
import ForgotPassword from './screens/ForgotPassword';
import Home from './screens/Home';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { store } from './redux/store';

const Stack = createStackNavigator()
const queryClient = new QueryClient()


export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={{ colors: { background: '#1C1E22', primary: '#548DFF', text: 'white', } }}>
            <Stack.Navigator initialRouteName={onboardingRoute}>
              <Stack.Group screenOptions={{ presentation: 'card', ...(TransitionPresets.SlideFromRightIOS) }}>
                <Stack.Screen options={{ headerShown: false }} name={onboardingRoute} component={Onboarding} />
                <Stack.Screen options={{ title: 'Login' }} name={loginRoute} component={Login} />
                <Stack.Screen options={{ headerShown: false }} name={homeRoute} component={Home} />
              </Stack.Group>
              <Stack.Group screenOptions={{ presentation: 'modal', ...(TransitionPresets.ModalPresentationIOS) }} >
                <Stack.Screen options={{ title: 'Recover account' }} name={forgotPasswordRoute} component={ForgotPassword} />
                <Stack.Screen options={{ headerShown: false, gestureEnabled: true, }} name={changePasswordModalRoute} component={ChangePasswordModal} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </PaperProvider>
    </Provider>
  );
}

