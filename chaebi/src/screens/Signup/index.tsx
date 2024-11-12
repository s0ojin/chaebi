import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Text from '../../components/CustomText';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import RoundButton from '../../components/RoundButton';
import {
  sendSigninRequest,
  sendSignupRequest,
  sendSmsCertRequest,
  sendSmsVerifyRequest,
} from '../../api/signup';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import messaging from '@react-native-firebase/messaging';
import {useToast} from '../../components/ToastContext';

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

export default function SignUpScreen({navigation}: SignUpScreenProps) {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [doneAuth, setDoneAuth] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(300);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState<string>('');
  const {showToast} = useToast();

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

  const handleSendAuthCode = async () => {
    try {
      // sendSmsCertRequest 함수로 API 호출
      const response = await sendSmsCertRequest({phoneNum: phoneNumber});

      // 전체 응답 객체 로그 확인
      console.log('Response:', response);

      // 응답 상태가 200인 경우 인증 코드 요청 후 화면 업데이트
      if (response && response.status === 200) {
        setShowAuth(true);
        setIsCounting(true);
      } else {
        // 응답 상태가 200이 아닐 경우 처리
        console.error('Failed to send auth code:', response);
      }
    } catch (error) {
      // API 호출 중 오류가 발생한 경우 에러 로그 출력
      console.error('Error sending auth code:', error);
    }
  };

  const handleDoneAuth = async () => {
    const response = await sendSmsVerifyRequest({
      phoneNum: phoneNumber,
      code: authCode,
    });
    console.log('Response:', response);
    if (response && response.status === 200) {
      const signinResponse = await sendSigninRequest({phone: phoneNumber});
      console.log('Signin Response:', response);
      if (signinResponse && signinResponse.status === 200) {
        navigation.navigate('Main');
      } else if (signinResponse && signinResponse.status === 215) {
        setDoneAuth(true);
      }
    }
  };

  const handleSignup = async () => {
    const getFcmToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('token is : ', token);
        await setFcmToken(token);
      } catch (error) {
        console.log('Error getting FcmToken : ', error);
      }
    };

    // getFcmToken이 완료될 때까지 대기
    await getFcmToken();

    // fcmToken이 설정된 후 sendSignupRequest 호출
    const response = await sendSignupRequest({
      phone: phoneNumber,
      name: name,
      fcmToken: fcmToken, // 이 시점에 fcmToken이 설정되었음
    });

    console.log('Response:', response);
    if (response && response.status === 200) {
      showToast(`${name}님 환영합니다.`);
      navigation.navigate('Main');
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
                onPress={() => sendSmsCertRequest({phoneNum: phoneNumber})}>
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
            <RoundButton content="회원가입" onPress={handleSignup} />
          </View>
        </View>
      )}
    </View>
  );
}

cin >> a >> b >> c;