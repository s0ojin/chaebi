import {View, Text} from 'react-native';
import React from 'react';
import Logo from '../../assets/logo/logo.svg';
import RoundButtonComp from '../../components/RoundButtonComp';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

type AbsenceScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Absence'>;
};

export default function AbsenceScreen({navigation}: AbsenceScreenProps) {
  return (
    <View className="flex-1 p-5">
      <View className="flex-1 justify-center items-center">
        <Logo width={150} height={120} />
        <Text className="text-lg font-['이서윤체'] text-center mt-3">
          남은 이들을 위한 채비
        </Text>
        <Text className="text-lg font-['이서윤체'] text-center mt-2">
          채우고, 비우기
        </Text>
      </View>
      <View className="justify-end w-full gap-5">
        <RoundButtonComp
          content={'박수진님이신가요?'}
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        />
        <RoundButtonComp
          content={'유족이신가요?'}
          onPress={() => {}}
          backgroundColor={'bg-[#D9D9D9]'}
          fontColor={'text-[#444444]'}
          border={'border-2 border-[#444444]'}
        />
      </View>
    </View>
  );
}
