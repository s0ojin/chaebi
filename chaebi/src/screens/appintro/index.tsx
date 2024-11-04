import {View, Text} from 'react-native';
import React, {useState} from 'react';
import RoundButtonComp from '../../components/RoundButtonComp';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Navigation prop type 정의
type AppIntroScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function AppIntroScreen({navigation}: AppIntroScreenProps) {
  const [step, setStep] = useState<number>(1);

  return (
    <View style={{flex: 1, padding: 20, alignItems: 'center', gap: 20}}>
      <View style={{flexDirection: 'row', gap: 20, marginTop: 50}}>
        {[1, 2, 3, 4].map(item => (
          <View
            key={item}
            style={{
              width: 10,
              height: 10,
              backgroundColor: step === item ? 'black' : '#cccccc',
              borderRadius: 10,
            }}
          />
        ))}
      </View>
      <Text style={{textAlign: 'center'}}>앱소개 {step}</Text>
      <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
        {step === 4 ? (
          <RoundButtonComp
            content={'시작하기'}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        ) : (
          <RoundButtonComp content={'다음'} onPress={() => setStep(step + 1)} />
        )}
        {step === 4 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 36,
              marginBottom: 16,
              gap: 8,
            }}>
            <Text
              style={{
                fontFamily: '이서윤체',
                fontSize: 20,
              }}>
              이미 회원이신가요?
            </Text>
            <Text
              style={{
                fontFamily: '이서윤체',
                fontSize: 20,
                color: 'blue', // '로그인' 텍스트에 색상 추가 (선택 사항)
              }}
              onPress={() => navigation.navigate('SignIn')}>
              로그인
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
