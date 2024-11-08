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
        navigation.replace('AppIntro');
      } else {
        navigation.replace('SignIn');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center">
      <Logo width={150} height={120} />
      <Text className="text-lg font-['이서윤체'] text-center mt-3">
        남은 이들을 위한 채비
      </Text>
      <Text className="text-lg font-['이서윤체'] text-center mt-2">
        채우고, 비우기
      </Text>
    </View>
  );
}
