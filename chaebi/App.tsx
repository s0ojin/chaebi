import './global.css';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/splash';
import SignInScreen from './src/screens/signin';
import AppIntroScreen from './src/screens/appintro';
import SignUpScreen from './src/screens/signup';
import RemainScreen from './src/screens/remain';

export type RootStackParamList = {
  Splash: undefined;
  Remain: undefined;
  AppIntro: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Remain" component={RemainScreen} />
        <Stack.Screen name="AppIntro" component={AppIntroScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
