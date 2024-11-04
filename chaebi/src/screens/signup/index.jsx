import {View, Text} from 'react-native';
import React, {useState} from 'react';
import HeaderComp from '../../components/HeaderComp';
import InputFieldComp from '../../components/InputFieldComp';
import RoundButtonComp from '../../components/RoundButtonComp';

export default function SignUpScreen() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderComp pageName={'회원가입'} />
      <View style={{marginTop: 32, gap: 36}}>
        <View style={{paddingHorizontal: 24, gap: 20}}>
          <Text style={{fontSize: 24, fontFamily: '이서윤체'}}>
            {!showAuth
              ? '휴대폰 번호로 회원가입해주세요!'
              : '인증번호를 입력해주세요.'}
          </Text>
          <InputFieldComp
            placeholder={'휴대폰 번호'}
            keyboardType={'phone-pad'}
            disabled={showAuth}
            isPhoneNum={true}
          />
          {!showAuth ? (
            <RoundButtonComp
              content={'인증번호 발송'}
              onPress={() => setShowAuth(true)}
              disabled={showAuth}
            />
          ) : (
            <></>
          )}
        </View>
        {showAuth ? (
          <View style={{paddingHorizontal: 24, gap: 20}}>
            {/* <Text style={{fontSize: 24, fontFamily: '이서윤체'}}>
              인증번호를 입력해주세요.
            </Text> */}
            <InputFieldComp
              placeholder={'인증번호'}
              keyboardType={'phone-pad'}
            />
            <RoundButtonComp content={'인증하기'} />
            <Text
              style={{
                fontSize: 24,
                fontFamily: '이서윤체',
                textAlign: 'center',
                marginTop: 28,
              }}>
              인증번호 재전송
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
