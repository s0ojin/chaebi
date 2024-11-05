import {View, Text} from 'react-native';
import React, {useState} from 'react';
import HeaderComp from '../../components/HeaderComp';
import InputFieldComp from '../../components/InputFieldComp';
import RoundButtonComp from '../../components/RoundButtonComp';

export default function SignInScreen() {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');

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
          {!showAuth ? (
            <RoundButtonComp
              content="인증번호 발송"
              onPress={() => setShowAuth(true)}
              disabled={showAuth}
            />
          ) : null}
        </View>
        {showAuth ? (
          <View className="px-6 gap-5">
            <InputFieldComp
              placeholder="인증번호"
              keyboardType="phone-pad"
              value={authCode}
              onChangeText={setAuthCode}
            />
            <RoundButtonComp content="인증하기" onPress={() => {}} />
            <Text className="text-2xl font-['이서윤체'] text-center mt-7">
              인증번호 재전송
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
