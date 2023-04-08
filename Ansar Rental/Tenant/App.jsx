import 'react-native-gesture-handler';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query/build/lib/QueryClientProvider';
import { ToastProvider } from 'react-native-toast-notifications';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient()

export default function App() {
  // useEffect(() => {
  //   requestUserPermission();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, [])

  return (
    <ToastProvider>
    <PaperProvider>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
      <AppNavigation />
    </DataProvider>
    </QueryClientProvider>
    </PaperProvider>
    </ToastProvider>
  );
}
