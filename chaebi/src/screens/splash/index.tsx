import {View, Text} from 'react-native';
import Logo from '../../assets/logo/logo.svg';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({navigation}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (true) {
        // 조건을 필요에 맞게 설정하세요.
        navigation.replace('AppIntro');
      } else {
        navigation.replace('SignIn');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

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
