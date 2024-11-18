import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Text from '../../components/CustomText';
import CustomNumberpad from '../../components/CustomNumberpad';
import PasswordState from '../../components/PasswordState';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
import {RootStackParamList} from '../../types/navigator';
import {useToast} from '../../components/ToastContext';
import {NO_PASSWORD_ALERT, NO_PASSWORD_TOAST} from '../../constants/password';

type SetPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CheckPw'>;
};

export default function CheckPasswordScreen({
  navigation,
}: SetPasswordScreenProps) {
  const [password, setPassword] = useState<string>('');
  const [isPassword, setIsPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const {showToast} = useToast();

  useEffect(() => {
    // const {showToast} = useToast();

    // 등록된 생체정보 있는지 확인
    const checkIsPassword: () => Promise<void> = async () => {
      const bioType = await AsyncStorage.getItem('bioType');
      const password = await AsyncStorage.getItem('password');
      if (bioType) {
        // 생체인식 데이터가 있다면,,,
        new ReactNativeBiometrics()
          .simplePrompt({
            promptMessage: '잠금해제를 위한 생체정보 확인',
          })
          .then(SimplePromptResult => {
            if (SimplePromptResult.success) {
              navigation.replace('Main');
              return;
            }
            if(password) {
              setPassword(password);
            } else{
              showToast(NO_PASSWORD_TOAST);
              setError(NO_PASSWORD_ALERT);
              setDisabled(true)
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    };
    checkIsPassword();
  }, []);

  const handleNumberPress = (num: string) => {
    // 비밀번호 확인 단계
    if (isPassword.length < 4) {
      setIsPassword(prev => prev + num);
      if (isPassword.length === 3) {
        // 4자리 입력 완료 시 확인
        if (password === isPassword + num) {
          setError('');
          // 비밀번호 일치 처리 (다음 단계로 이동)
          AsyncStorage.setItem('password', password);
          navigation.replace('Main');
        } else {
          setError('비밀번호가 일치하지 않습니다.');
          setIsPassword('');
        }
      }
    }
  };

  const handleBackspace = () => {
    setIsPassword(isPassword.slice(0, -1));
  };

  return (
    <View className="p-5">
      <Text className="mt-32 mb-16 text-center text-2xl">
        {'비밀번호를 입력해주세요.'}
      </Text>
      <PasswordState length={isPassword.length} />
      {error ? (
        <Text className="mt-4 text-center text-xl text-_red">{error}</Text>
      ) : null}
      <View className="my-16" />
      <CustomNumberpad
        onNumberPress={handleNumberPress}
        onBackspacePress={handleBackspace}
        disabled={disabled}
      />
    </View>
  );
}
