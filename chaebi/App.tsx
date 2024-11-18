import './global.css';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from './src/components/ToastContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootStackNavigator from './src/navigation/RootStackNavigator';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <GestureHandlerRootView>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
