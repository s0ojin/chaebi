import {View, Text} from 'react-native';
import Logo from '../../assets/logo/logo.svg';
import React from 'react';

export default function SplashScreen({navigation}) {
  setTimeout(() => {
    if (1) {
      navigation.replace('AppIntro');
    } else {
      navigation.replace('SignIn');
    }
  }, 1000);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Logo width={150} height={120} />
      <Text
        style={{
          fontSize: 20,
          fontFamily: '이서윤체',
          textAlign: 'center',
          marginTop: 12,
        }}>
        남은 이들을 위한 채비
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: '이서윤체',
          textAlign: 'center',
          marginTop: 8,
        }}>
        채우고, 비우기
      </Text>
    </View>
  );
}
