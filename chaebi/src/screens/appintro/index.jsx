import {View, Text} from 'react-native';
import React, {useState} from 'react';
import RoundButtonComp from '../../components/RoundButtonComp';

export default function AppIntroScreen({navigation}) {
  const [step, setStep] = useState(1);

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
            onPress={() => navigation.navigate('SignUp')}
          />
        ) : (
          <RoundButtonComp content={'다음'} onPress={() => setStep(step + 1)} />
        )}
      </View>
    </View>
  );
}
