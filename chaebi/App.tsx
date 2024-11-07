import './global.css';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/splash';
import SignInScreen from './src/screens/signin';
import AppIntroScreen from './src/screens/appintro';
import SignUpScreen from './src/screens/signup';
import RemainScreen from './src/screens/remain';
import AbsenceScreen from './src/screens/absence';
import SendCodeScreen from './src/screens/sendcode';
import ContactScreen from './src/screens/remain/contacts';
import RemainWriteScreen from './src/screens/remain/write';
import MainScreen from './src/screens/main';
import SetPasswordScreen from './src/screens/setpw';

export type RootStackParamList = {
  Splash: undefined;
  Remain: undefined;
  AppIntro: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Absence: undefined;
  SendCode: undefined;
  Contacts: undefined;
  RemainWrite: undefined;
  Main: undefined;
  SetPw: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="AppIntro" component={AppIntroScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Absence" component={AbsenceScreen} />
        <Stack.Screen name="SendCode" component={SendCodeScreen} />
        <Stack.Screen name="Remain" component={RemainScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
        <Stack.Screen name="RemainWrite" component={RemainWriteScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="SetPw" component={SetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
