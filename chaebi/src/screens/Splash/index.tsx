import {View} from 'react-native';
import Text from '../../components/CustomText';
import Logo from '../../assets/logo/logo.svg';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../types/navigator';

type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({navigation}: SplashScreenProps) {
  useEffect(() => {
    const checkLock = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          setTimeout(() => {
            navigation.replace('AppIntro');
          }, 1000);
        } else {
          const bioType = await AsyncStorage.getItem('bioType');
          const password = await AsyncStorage.getItem('password');
          setTimeout(() => {
            if (password || bioType) {
              navigation.replace('CheckPw');
            } else {
              navigation.replace('Main');
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLock();
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center">
      <Logo width={150} height={120} />
      <Text className="text-2xl text-center mt-3">남은 이들을 위한 채비</Text>
      <Text className="text-2xl text-center mt-2">채우고, 비우기</Text>
    </View>
  );
}
