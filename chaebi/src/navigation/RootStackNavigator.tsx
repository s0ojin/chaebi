import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigator';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
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
import QuestionScreen from '../screens/Remain/question';
import CompleteScreen from '../screens/Remain/complete';
import RemainEditPreScreen from '../screens/Remain/editPrecident';
import SetPasswordScreen from '../screens/Setpw';
import RemainEditorScreen from '../screens/RemainEditor';
import AlbumScreen from '../screens/Album';
import MypageScreen from '../screens/Mypage';
import SetAlertScreen from '../screens/Mypage/SetAlert';
import SetLockScreen from '../screens/Mypage/SetLock';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RootStackNavigator() {
  const Stack = createStackNavigator<RootStackParamList>();

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // 앱이 백그라운드나 종료된 상태에서 알림을 클릭했을 때
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage?.data?.screenName === 'Absence') {
        navigation.navigate('Absence');
      }
    });

    // 앱이 처음 시작되었을 때 알림 클릭 처리 (앱이 완전히 종료되었을 때)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.screen === 'Absence') {
          navigation.navigate('Absence'); // 'Absence' screen으로 내비게이션
        }
      });

    // 포그라운드에서 알림 수신
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('FCM message received in foreground:', remoteMessage);
      // 필요에 따라 알림을 표시하거나 다른 처리를 할 수 있음
    });

    return () => {
      unsubscribe();
      unsubscribeOnMessage();
    };
  }, [navigation]);

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
      <Stack.Screen name="RemainQuestion" component={QuestionScreen} />
      <Stack.Screen name="RemainComplete" component={CompleteScreen} />
      <Stack.Screen name="RemainWrite" component={RemainEditPreScreen} />
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
