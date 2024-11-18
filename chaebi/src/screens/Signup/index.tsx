import React, {useState, useEffect} from 'react';
import {Image, PermissionsAndroid, View} from 'react-native';
import Text from '../../components/CustomText';
import InfoCircle from '../../assets/icon/info-circle.svg';
import InputField from '../../components/InputField';
import RoundButton from '../../components/RoundButton';
import {
  sendSigninRequest,
  sendSignupRequest,
  sendSmsCertRequest,
  sendSmsVerifyRequest,
} from '../../api/signup';
import {StackNavigationProp} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import {useToast} from '../../components/ToastContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../types/navigator';
import Header from '../../components/Header';

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

export default function SignUpScreen({navigation}: SignUpScreenProps) {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(300);
  const [isCounting, setIsCounting] = useState<boolean>(false);
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
      const response = await sendSmsCertRequest({phoneNum: phoneNumber});
      console.log('Response:', response);
      if (response && response.status === 200) {
        setShowAuth(true);
        setIsCounting(true);
      } else {
        console.error('Failed to send auth code:', response);
      }
    } catch (error) {
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
      handleSignin();
    }
  };

  const handleSignin = async () => {
    const token = await getFcmToken();
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
    } else if (signinResponse && signinResponse.status === 215) {
      setStep(step + 1);
    }
  };

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

  const handleSignup = async (push: boolean) => {
    const token = await getFcmToken();
    const response = await sendSignupRequest({
      phone: phoneNumber,
      name: name,
      fcmToken: token,
      push: push,
    });

    console.log('Response:', response);
    if (response && response.status === 200) {
      setStep(step + 1);
      //handleSignin();
    }
  };

  const handleNotice = () => {
    handleSignup(true);
  };

  const handleUnnotice = async () => {
    handleSignup(false);
  };

  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('granted', granted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {(step === 0 || step === 1) && <Header pageName="시작하기" />}
      {step === 0 && (
        //step0
        <View className="mt-8 gap-9">
          <View className="px-6 gap-5">
            <Text className="text-2xl">
              {!showAuth
                ? '휴대폰 번호를 입력해주세요!'
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
      )}
      {step === 1 && (
        //step1
        <View className="mt-8 gap-9">
          <View className="px-6 gap-5">
            <Text className="text-2xl">성함을 알려주세요.</Text>
            <InputField
              placeholder="이름"
              keyboardType="default"
              value={name}
              onChangeText={setName}
            />
            <RoundButton
              content="회원가입"
              onPress={() => {
                setStep(step + 1);
                requestNotificationPermission();
              }}
            />
          </View>
        </View>
      )}
      {step === 2 && (
        //step2
        <View className="flex-1">
          <View className="flex-1 items-center justify-center">
            <Image
              className="w-32 h-32"
              source={require('../../assets/icon/Bell.gif')}
            />
            <Text className="text-center text-4xl mt-10">푸시 알림 받기</Text>
            <Text className="text-center text-2xl mt-20">
              채비는 7일 간격으로 앱에 방문하지 않을 시{'\n'}사용자의 생존여부를
              묻는 푸시알림을 전송합니다.
            </Text>
            <Text className="text-center text-2xl mt-10">
              장기미방문 알림은 서비스 이용에 중요한 알림이니{'\n'}반드시 활성화
              후 사용해주세요!
            </Text>
          </View>
          <View className="p-4 w-full justify-end">
            <View className="mb-8">
              <InfoCircle width={4} height={4} />
              <Text className="text-center text-xl text-primary-300">
                알림에 동의하지 않아도 서비스를 이용할 수 있습니다.
              </Text>
            </View>
            <RoundButton content="알림 받기" onPress={handleNotice} />
            <Text
              className="text-center text-2xl my-9 text-primary-300"
              onPress={handleUnnotice}>
              다음에 할게요!
            </Text>
          </View>
        </View>
      )}
      {step === 3 && (
        //step3
        <View className="flex-1 p-4">
          <View className="flex-1 justify-center">
            <Text className="text-center text-4xl">
              원활한 서비스 이용을 위해
            </Text>
            <Text className="text-center text-4xl mt-10">
              다음 전화번호를 고객님의 연락처에 저장해주세요.
            </Text>
            <Text className="text-center text-4xl my-10">
              채비 서비스 : 010-7659-6450
            </Text>
          </View>
          <View className="w-full justify-end">
            <RoundButton content="시작하기" onPress={handleSignin} />
          </View>
        </View>
      )}
      {step === 4 && (
        //error
        <View>
          <Text>Something went wrong while sign-up process.</Text>
          <Text>Please restart app.</Text>
        </View>
      )}
    </View>
  );
}
