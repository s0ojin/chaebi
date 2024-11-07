import {View} from 'react-native';
import Text from './CustomText';
import React from 'react';
import Backspace from '../assets/icon/dark-backspace.svg';

export default function CustomNumberpad() {
  return (
    <View className="items-center">
      <View className="flex-row h-24">
        <View className="w-36">
          <Text className="text-center text-3xl">1</Text>
        </View>
        <View className="w-36">
          <Text className="text-center text-3xl">2</Text>
        </View>
        <View className="w-36">
          <Text className="text-center text-3xl">3</Text>
        </View>
      </View>
      <View className="flex-row h-24">
        <View className="w-36">
          <Text className="text-center text-3xl">4</Text>
        </View>
        <View className="w-36">
          <Text className="text-center text-3xl">5</Text>
        </View>
        <View className="w-36">
          <Text className="text-center text-3xl">6</Text>
        </View>
      </View>
      <View className="flex-row h-24">
        <View className="w-36">
          <Text className="text-center text-3xl">7</Text>
        </View>
        <View className="w-36">
          <Text className="text-center text-3xl">8</Text>
        </View>
        <View className="w-36">
          <Text className="text-center text-3xl">9</Text>
        </View>
      </View>
      <View className="flex-row h-24">
        <View className="w-36">
          <Text className="text-center text-3xl"></Text>
        </View>
        <View className="w-36">
          <Text className="text-center text-3xl">0</Text>
        </View>
        <View className="w-36 items-center">
          <Backspace width={24} height={24} />
        </View>
      </View>
    </View>
  );
}
