import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/splash';
import SignInScreen from './src/screens/signin';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name={'Splash'}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <stack.Screen
          name={'SignIn'}
          component={SignInScreen}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
