import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Text from '../../components/CustomText';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import RoundButton from '../../components/RoundButton';
import {sendSmsCertRequest, sendSmsVerifyRequest} from '../../api/signup';

export default function SignUpScreen() {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [doneAuth, setDoneAuth] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [name, setName] = useState<string>('');
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
    sendSmsCertRequest({phoneNumber});
  };

  const handleDoneAuth = async () => {
    const response = await sendSmsVerifyRequest({phoneNumber, authCode});
    if (response && response.success) {
      setDoneAuth(true);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header pageName="회원가입" />
      {!doneAuth ? (
        <View className="mt-8 gap-9">
          <View className="px-6 gap-5">
            <Text className="text-2xl">
              {!showAuth
                ? '휴대폰 번호로 회원가입해주세요!'
                : '인증번호를 입력해주세요.'}
            </Text>
            <InputField
              placeholder="휴대폰 번호"
              keyboardType="phone-pad"
              disabled={showAuth}
              isPhoneNum={true}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <RoundButton
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
              <InputField
                placeholder="인증번호"
                keyboardType="phone-pad"
                value={authCode}
                onChangeText={setAuthCode}
              />
              <RoundButton content="인증하기" onPress={handleDoneAuth} />
              <Text
                className="text-2xl text-center mt-7"
                onPress={() => sendSmsCertRequest({phoneNumber})}>
                인증번호 재전송
              </Text>
            </View>
          ) : null}
        </View>
      ) : (
        <View className="mt-8 gap-9">
          <View className="px-6 gap-5">
            <Text className="text-2xl">성함을 알려주세요.</Text>
            <InputField
              placeholder="이름"
              keyboardType="default"
              value={name}
              onChangeText={setName}
            />
            <RoundButton content="회원가입" onPress={() => {}} />
          </View>
        </View>
      )}
    </View>
  );
}
