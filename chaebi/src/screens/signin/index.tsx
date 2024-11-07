import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderComp from '../../components/HeaderComp';
import InputFieldComp from '../../components/InputFieldComp';
import RoundButtonComp from '../../components/RoundButtonComp';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

type SignInScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
};

export default function SignInScreen({navigation}: SignInScreenProps) {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(300);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }

    if (countdown === 0) {
      setIsCounting(false);
      setCountdown(300);
    }

    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  const handleSendAuthCode = () => {
    setShowAuth(true);
    setIsCounting(true);
  };

  return (
    <View className="flex-1 bg-white">
      <HeaderComp pageName="로그인" />
      <View className="mt-8 gap-9">
        <View className="px-6 gap-5">
          <Text className="text-2xl font-['이서윤체']">
            {!showAuth
              ? '휴대폰 번호로 로그인해주세요.'
              : '인증번호를 입력해주세요.'}
          </Text>
          <InputFieldComp
            placeholder="휴대폰 번호"
            keyboardType="phone-pad"
            disabled={showAuth}
            isPhoneNum={true}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <RoundButtonComp
            content={
              isCounting
                ? `남은 시간: ${Math.floor(countdown / 60)}:${String(
                    countdown % 60,
                  ).padStart(2, '0')}`
                : '인증번호 발송'
            }
            onPress={handleSendAuthCode}
            disabled={showAuth || isCounting}
          />
        </View>
        {showAuth ? (
          <View className="px-6 gap-5">
            <InputFieldComp
              placeholder="인증번호"
              keyboardType="phone-pad"
              value={authCode}
              onChangeText={setAuthCode}
            />
            <RoundButtonComp
              content="인증하기"
              onPress={() => {
                navigation.navigate('Main');
              }}
            />
            <Text className="text-2xl font-['이서윤체'] text-center mt-7">
              인증번호 재전송
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
