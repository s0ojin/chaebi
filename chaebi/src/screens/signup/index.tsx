import React, { useState } from 'react';
import { View, Text } from 'react-native';
import HeaderComp from '../../components/HeaderComp';
import InputFieldComp from '../../components/InputFieldComp';
import RoundButtonComp from '../../components/RoundButtonComp';

const SignUpScreen: React.FC = () => {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [doneAuth, setDoneAuth] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // 휴대폰 번호 상태
  const [authCode, setAuthCode] = useState<string>(''); // 인증번호 상태
  const [name, setName] = useState<string>(''); // 이름 상태

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderComp pageName="회원가입" />
      {!doneAuth ? (
        <View style={{ marginTop: 32, gap: 36 }}>
          <View style={{ paddingHorizontal: 24, gap: 20 }}>
            <Text style={{ fontSize: 24, fontFamily: '이서윤체' }}>
              {!showAuth
                ? '휴대폰 번호로 회원가입해주세요!'
                : '인증번호를 입력해주세요.'}
            </Text>
            <InputFieldComp
              placeholder="휴대폰 번호"
              keyboardType="phone-pad"
              disabled={showAuth}
              isPhoneNum={true}
              value={phoneNumber} // 휴대폰 번호 값 전달
              onChangeText={setPhoneNumber} // 핸들러 전달
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
            <View style={{ paddingHorizontal: 24, gap: 20 }}>
              <InputFieldComp
                placeholder="인증번호"
                keyboardType="phone-pad"
                value={authCode} // 인증번호 값 전달
                onChangeText={setAuthCode} // 핸들러 전달
              />
              <RoundButtonComp
                content="인증하기"
                onPress={() => setDoneAuth(true)}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: '이서윤체',
                  textAlign: 'center',
                  marginTop: 28,
                }}
              >
                인증번호 재전송
              </Text>
            </View>
          ) : null}
        </View>
      ) : (
        <View style={{ marginTop: 32, gap: 36 }}>
          <View style={{ paddingHorizontal: 24, gap: 20 }}>
            <Text style={{ fontSize: 24, fontFamily: '이서윤체' }}>
              성함을 알려주세요.
            </Text>
            <InputFieldComp
              placeholder="이름"
              keyboardType="default"
              value={name} // 이름 값 전달
              onChangeText={setName} // 핸들러 전달
            />
            <RoundButtonComp content="회원가입" onPress={() => {}} />
          </View>
        </View>
      )}
    </View>
  );
};

export default SignUpScreen;
