import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigator';
import AppIntroScreen from '../screens/Appintro';
import SignUpScreen from '../screens/Signup';
import SignInScreen from '../screens/Signin';
import AbsenceScreen from '../screens/Absence';
import SendCodeScreen from '../screens/Sendcode';
import SplashScreen from '../screens/Splash';
import CheckPasswordScreen from '../screens/CheckPw';
import MainScreen from '../screens/Main';
import RemainScreen from '../screens/Remain';
import ContactScreen from '../screens/Remain/contacts';
import RemainWriteScreen from '../screens/Remain/write';
import QuestionScreen from '../screens/Remain/question';
import CompleteScreen from '../screens/Remain/complete';
import SetPasswordScreen from '../screens/Setpw';
import RemainEditorScreen from '../screens/RemainEditor';
import AlbumScreen from '../screens/Album';
import MypageScreen from '../screens/Mypage';
import SetAlertScreen from '../screens/Mypage/SetAlert';
import SetLockScreen from '../screens/Mypage/SetLock';

export default function RootStackNavigator() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="CheckPw" component={CheckPasswordScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Remain" component={RemainScreen} />
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Screen name="RemainWrite" component={RemainWriteScreen} />
      <Stack.Screen name="RemainQuestion" component={QuestionScreen} />
      <Stack.Screen name="RemainComplete" component={CompleteScreen} />
      <Stack.Screen name="SetPw" component={SetPasswordScreen} />
      <Stack.Screen name="RemainEditor" component={RemainEditorScreen} />
      <Stack.Screen name="Album" component={AlbumScreen} />
      <Stack.Screen name="Setting" component={MypageScreen} />
      <Stack.Screen name="SetAlert" component={SetAlertScreen} />
      <Stack.Screen name="SetLock" component={SetLockScreen} />
      <Stack.Screen name="AppIntro" component={AppIntroScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Absence" component={AbsenceScreen} />
      <Stack.Screen name="SendCode" component={SendCodeScreen} />
    </Stack.Navigator>
  );
}
