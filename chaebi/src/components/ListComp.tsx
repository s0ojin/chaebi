import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Setting from '../assets/icon/settings-alt.svg';

interface Message {
  name: string;
  phone: string;
  imgUrl: string;
}

interface RemainListViewCompProp {
  message: Message;
}

export default function RemainListViewComp({message}: RemainListViewCompProp) {
  return (
    <TouchableOpacity
      className="flex-row w-96 h-24 px-8 bg-[#F4F4F4] rounded-2xl justify-between items-center"
      onPress={() => {}}>
      <View className="flex-row justify-left items-center">
        {/* 사용자 이미지 */}
        {message.imgUrl === '' ? (
          <View className="bg-[#000] rounded-full w-12 h-12" />
        ) : (
          <Image
            source={{uri: message.imgUrl}}
            className="rounded-full w-12 h-12"
          />
        )}
        {/* 사용자 정보 */}
        <View className="ml-4 gap-2">
          <Text className="text-[14px] font-[이서윤체]">{message.name}</Text>
          <Text className="text-[14px] font-[이서윤체]">{message.phone}</Text>
        </View>
      </View>
      <Setting />
    </TouchableOpacity>
  );
}
