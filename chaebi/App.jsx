import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/splash';
import SignInScreen from './src/screens/signin';
import AppIntroScreen from './src/screens/appintro';
import SignUpScreen from './src/screens/signup';

const stack = createNativeStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     try {
  //       const hasLaunched = await AsyncStorage.getItem('hasLaunched');
  //       if (hasLaunched === null) {
  //         // 앱을 처음 실행한 경우
  //         setIsFirstLaunch(true);
  //         await AsyncStorage.setItem('hasLaunched', 'true');
  //       } else {
  //         setIsFirstLaunch(false);
  //       }
  //     } catch (error) {
  //       console.log("Error checking app's launch status:", error);
  //     }
  //   };
  //   checkFirstLaunch();
  // }, []);

  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen
          name={'Splash'}
          component={SplashScreen}
          initialParams={{isFirstLaunch}}
        />
        <stack.Screen name={'AppIntro'} component={AppIntroScreen} />
        <stack.Screen name={'SignUp'} component={SignUpScreen} />
        <stack.Screen name={'SignIn'} component={SignInScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
