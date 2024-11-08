import {View} from 'react-native';
import Text from '../../components/CustomText';
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
      <Text className="text-2xl text-center mt-3">남은 이들을 위한 채비</Text>
      <Text className="text-2xl text-center mt-2">채우고, 비우기</Text>
    </View>
  );
}
