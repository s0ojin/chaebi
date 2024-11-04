import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/splash';
import SignInScreen from './src/screens/signin';
import AppIntroScreen from './src/screens/appintro';
import SignUpScreen from './src/screens/signup';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name={'Splash'} component={SplashScreen} />
        <stack.Screen name={'AppIntro'} component={AppIntroScreen} />
        <stack.Screen name={'SignUp'} component={SignUpScreen} />
        <stack.Screen name={'SignIn'} component={SignInScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
