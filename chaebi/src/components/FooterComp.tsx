import {View, Text} from 'react-native';
import React from 'react';

export default function FooterComp() {
  return (
    <View className="flex-row">
      <View className="flex-1">
        <Text className="text-center">홈</Text>
      </View>
      <View className="flex-1">
        <Text className="text-center">남기기</Text>
      </View>
      <View className="flex-1">
        <Text className="text-center">채우기</Text>
      </View>
      <View className="flex-1">
        <Text className="text-center">마이페이지</Text>
      </View>
    </View>
  );
}
