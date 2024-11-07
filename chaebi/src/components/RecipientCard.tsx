import {View, TouchableOpacity, Image, Pressable} from 'react-native';
import React from 'react';
import Setting from '../assets/icon/settings-alt.svg';
import Text from './CustomText';
import {Message} from '../screens/Remain/index';

/*
  export interface Message {
    id?: number;
    title: string;
    userId?: number;
    recipient: Recipient;
    lastModifiedDate: Date;
    // true가 중간정렬?
    sort: boolean;
  }

  export interface Recipient {
    id?: number;
    name: string;
    phone: string;
    imgUrl: string;
  }
*/
const calculateDate = function (date: string) {
  let update = new Date(date);
  let now = new Date();
  console.log(now.getHours());
  // 차이 구하고
  let sub = now.getTime() - update.getTime();
  const minutes = Math.floor(sub / (1000 * 60)); // 분 단위로 변환
  if (minutes < 60) {
    return '방금 전';
  }
  const hours = Math.floor(minutes / 60); // 시간 단위로 변환
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  const days = Math.floor(hours / 24); // 일 단위로 변환
  if (days <= 30) {
    return `${hours}일 전`;
  }
  const months = Math.floor(days / 30); // 월 단위로 변환
  if (months < 12) {
    return `${months}달 전`;
  }
  const years = Math.floor(days / 365); // 년 단위로 변환
  return `${years}년 전`;
};

interface RemainListViewProp {
  message: Message;
  isSetting: boolean;
  setOnPress?: () => void;
}

export default function RemainListView({
  message,
  isSetting,
  setOnPress,
}: RemainListViewProp) {
  return (
    <TouchableOpacity
      className="flex-row w-full h-24 px-8 bg-[#F4F4F4] rounded-2xl justify-between items-center"
      onPress={setOnPress}>
      <View className="flex-row justify-left items-center">
        {/* 사용자 이미지 */}
        {message.recipient.imgUrl === null ||
        message.recipient.imgUrl === '' ? (
          <View className="bg-[#000] rounded-full w-12 h-12" />
        ) : (
          <Image
            source={{uri: message.recipient.imgUrl}}
            className="rounded-full w-12 h-12"
          />
        )}
        {/* 사용자 정보 */}
        <View className="ml-4 gap-2">
          <Text className="text-[14px]">{message.recipient.name}</Text>
          <Text className="text-[14px]">{message.recipient.phone}</Text>
        </View>
      </View>
      {isSetting ? (
        <Setting />
      ) : (
        <View className="flex-row h-full py-4 items-end">
          <Text className="">
            마지막 수정 : {calculateDate(message.lastModifiedDate)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
