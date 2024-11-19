import {View} from 'react-native';
import Text from '../../components/CustomText';
import React, {useEffect, useState} from 'react';
import Logo from '../../assets/logo/logo.svg';
import RoundButton from '../../components/RoundButton';
import {StackNavigationProp} from '@react-navigation/stack';
import WarningModal from '../../components/WarningModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../types/navigator';
import {sendSigninRequest} from '../../api/signup';
import messaging from '@react-native-firebase/messaging';
import {useToast} from '../../components/ToastContext';

type AbsenceScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Absence'>;
};

export default function AbsenceScreen({navigation}: AbsenceScreenProps) {
  // 모달 가시성 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState<string | null>('');
  const {showToast} = useToast();

  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('token is : ', token);
      return token;
    } catch (error) {
      console.log('Error getting FcmToken : ', error);
      return '';
    }
  };

  const handleSignin = async () => {
    const token = await getFcmToken();
    const phoneNumber = (await AsyncStorage.getItem('phoneNumber')) ?? '';
    const signinResponse = await sendSigninRequest({
      phone: phoneNumber,
      fcmToken: token,
    });
    console.log('Signin Response:', signinResponse);
    if (signinResponse && signinResponse.status === 200) {
      await AsyncStorage.setItem('name', signinResponse.data.name);
      await AsyncStorage.setItem(
        'phoneNumber',
        signinResponse.data.phoneNumber,
      );
      await AsyncStorage.setItem(
        'accessToken',
        signinResponse.data.accessToken,
      );
      await AsyncStorage.setItem(
        'refreshToken',
        signinResponse.data.refreshToken,
      );
      console.log('name', await AsyncStorage.getItem('name'));
      console.log('phoneNumber', await AsyncStorage.getItem('phoneNumber'));
      console.log('accessToken:', await AsyncStorage.getItem('accessToken'));
      console.log('refreshToken:', await AsyncStorage.getItem('refreshToken'));
      showToast(`${signinResponse.data.name}님 환영합니다.`);
      navigation.replace('Main');
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem('name');
      setUsername(name);
    };
    getName();
  }, []);

  return (
    <View className="flex-1 p-5">
      <View className="flex-1 justify-center items-center">
        <Logo width={150} height={120} />
        <Text className="text-2xl text-center mt-3">남은 이들을 위한 채비</Text>
        <Text className="text-2xl text-center mt-2">채우고, 비우기</Text>
      </View>
      <View className="justify-end w-full gap-5">
        <RoundButton
          content={`${username}님이신가요?`}
          onPress={handleSignin}
        />
        <RoundButton
          content={'유족이신가요?'}
          onPress={() => {
            setModalVisible(true);
          }}
          backgroundColor={'bg-primary-200'}
          fontColor={'text-primary-400'}
          border={'border-2 border-primary-400'}
        />
      </View>

      <WarningModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
}
