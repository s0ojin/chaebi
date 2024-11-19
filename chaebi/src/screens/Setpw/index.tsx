import React, {useState} from 'react';
import {View} from 'react-native';
import Text from '../../components/CustomText';
import Cross from '../../assets/icon/cross.svg';
import CustomNumberpad from '../../components/CustomNumberpad';
import PasswordState from '../../components/PasswordState';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../types/navigator';

type SetPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SetPw'>;
};

export default function SetPasswordScreen({
  navigation,
}: SetPasswordScreenProps) {
  const [password, setPassword] = useState<string>('');
  const [checkword, setCheckword] = useState<string>('');
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleNumberPress = (num: string) => {
    if (!isConfirming) {
      // 첫 번째 비밀번호 입력
      if (password.length < 4) {
        setPassword(prev => prev + num);
        if (password.length === 3) {
          setIsConfirming(true); // 4자리 입력 시 확인 단계로 전환
        }
      }
    } else {
      // 비밀번호 확인 단계
      if (checkword.length < 4) {
        setCheckword(prev => prev + num);
        if (checkword.length === 3) {
          // 4자리 입력 완료 시 확인
          if (password === checkword + num) {
            setError('');
            // 비밀번호 일치 처리 (다음 단계로 이동)
            AsyncStorage.setItem('password', password);
            navigation.goBack();
          } else {
            setError('비밀번호가 일치하지 않습니다.');
            setCheckword('');
          }
        }
      }
    }
  };

  const handleBackspace = () => {
    if (!isConfirming) {
      setPassword(password.slice(0, -1));
    } else {
      setCheckword(checkword.slice(0, -1));
    }
  };

  return (
    <View className="p-5">
      <View className="items-end">
        <Cross width={40} height={40} color={'#444444'} onPress={() => navigation.goBack()} />
      </View>
      <Text className="mt-32 mb-16 text-center text-2xl">
        {isConfirming ? '한번 더 입력해주세요.' : '비밀번호를 입력해주세요.'}
      </Text>
      <PasswordState
        length={isConfirming ? checkword.length : password.length}
      />
      {error ? (
        <Text className="mt-4 text-center text-xl text-_red">{error}</Text>
      ) : null}
      <View className="my-16" />
      <CustomNumberpad
        onNumberPress={handleNumberPress}
        onBackspacePress={handleBackspace}
      />
    </View>
  );
}
