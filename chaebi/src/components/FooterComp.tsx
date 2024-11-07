import {View, Text} from 'react-native';
import React from 'react';
import Home from '../assets/icon/home.svg';
import Box from '../assets/icon/box.svg';
import Layout from '../assets/icon/layout.svg';
import Person from '../assets/icon/person.svg';

export default function FooterComp() {
  return (
    <View className="flex-row justify-between px-2 my-4">
      <View className="items-center w-20">
        <Home width={32} height={32} />
        <Text className="text-xs text-center text-[#D2D2D2]">홈</Text>
      </View>
      <View className="items-center w-20">
        <Box width={32} height={32} />
        <Text className="text-xs text-center text-[#D2D2D2]">남기기</Text>
      </View>
      <View className="items-center w-20">
        <Layout width={32} height={32} />
        <Text className="text-xs text-center text-[#D2D2D2]">채우기</Text>
      </View>
      <View className="items-center w-20">
        <Person width={32} height={32} />
        <Text className="text-xs text-center text-[#D2D2D2]">마이페이지</Text>
      </View>
    </View>
  );
}
