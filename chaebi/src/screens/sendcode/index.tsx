import {View, Text} from 'react-native';
import React from 'react';
import Logo from '../../assets/logo/logo.svg';
import RoundButtonComp from '../../components/RoundButtonComp';

export default function SendCodeScreen() {
  return (
    <View className="flex-1 p-5">
      <View className="flex-1 items-center justify-center gap-12">
        <Logo width={150} height={120} />
        <View className="gap-9">
          <Text className="text-center text-2xl font-['이서윤체']">
            안녕하세요.
          </Text>
          <Text className="text-center text-2xl font-['이서윤체']">
            삶을 기록하고, 기록자가 떠나면{'\n'}
            남은분들께 전달해 드리는{'\n'}
            채비입니다.
          </Text>
          <Text className="text-center text-2xl font-['이서윤체']">
            코드받기 버튼을 누르면{'\n'}
            생전에 고인이 등록해두셨던{'\n'}
            열람인 분들께 코드가 전송됩니다.{'\n'}
          </Text>
          <Text className="text-center text-2xl font-['이서윤체']">
            기록자가 떠나셨다면{'\n'}
            기록이 전달될 수 있게{'\n'}
            버튼을 눌러주세요.
          </Text>
        </View>
      </View>
      <View className="w-full justify-end">
        <RoundButtonComp content="코드 전송하기" onPress={() => {}} />
      </View>
    </View>
  );
}
