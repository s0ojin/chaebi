import {View, Text} from 'react-native';
import React, {useState} from 'react';
import RoundButton from '../../components/RoundButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

type AppIntroScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AppIntro'>;
};

export default function AppIntroScreen({navigation}: AppIntroScreenProps) {
  const [step, setStep] = useState<number>(1);

  return (
    <View className="flex-1 p-5 items-center gap-5">
      <View className="flex-row gap-5 mt-12">
        {[1, 2, 3, 4].map(item => (
          <View
            key={item}
            className={`w-2.5 h-2.5 rounded-full ${
              step === item ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
      <Text className="text-center">앱소개 {step}</Text>
      <View className="flex-1 justify-end w-full">
        <Text onPress={() => navigation.navigate('Absence')}>
          Go to absence
        </Text>
        <Text onPress={() => navigation.navigate('Remain')}>Go to Remain</Text>
        <Text onPress={() => navigation.navigate('SetPw')}>Go to SetPw</Text>
        <Text onPress={() => navigation.navigate('RemainEditor')}>
          Go to RemainEditor
        </Text>
        <Text onPress={() => navigation.navigate('Album')}>Go to album</Text>
        {step === 4 ? (
          <RoundButton
            content={'시작하기'}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        ) : (
          <RoundButton content={'다음'} onPress={() => setStep(step + 1)} />
        )}
        {step === 4 && (
          <View className="flex-row justify-center mt-9 mb-4 gap-2">
            <Text className="font-['이서윤체'] text-xl">
              이미 회원이신가요?
            </Text>
            <Text
              className="font-['이서윤체'] text-xl text-blue-500"
              onPress={() => navigation.navigate('SignIn')}>
              로그인
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
