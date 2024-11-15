import {View, TouchableOpacity, Image, Pressable} from 'react-native';
import React from 'react';
import Setting from '../assets/icon/settings-alt.svg';
import Text from './CustomText';
import {Recipient} from '../screens/Remain/index';

const calculateDate = function (date: string) {
  let update = new Date(date);
  let now = new Date();
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
  if (days >= 1 && days <= 30) {
    return `${days}일 전`;
  }
  const months = Math.floor(days / 30); // 월 단위로 변환
  if (months < 12) {
    return `${months}달 전`;
  }
  const years = Math.floor(days / 365); // 년 단위로 변환
  return `${years}년 전`;
};

const formatPhoneNumber:(phoneNumber:string)=> string = (phoneNumber:string) => {
  return phoneNumber.replace(
    /^(02|01[0-9])(\d{3,4})(\d{4})$/,
    "$1-$2-$3"
  );
};

interface RemainListViewProp {
  recipient: Recipient;
  isSetting: boolean;
  setOnPress?: () => void;
  setOnSet?: () => void;
}

export default function RemainListView({
  recipient,
  isSetting,
  setOnPress,
  setOnSet,
}: RemainListViewProp) {
  return (
    <TouchableOpacity
      className="flex-row w-full h-24 px-4 bg-[#F4F4F4] rounded-2xl justify-between items-center"
      onPress={setOnPress}>
      <View className="flex-row justify-left items-center">
        {/* 사용자 이미지 */}
        {recipient.imgUrl === null || recipient.imgUrl === '' ? (
          <View className="bg-primary-300 rounded-full w-12 h-12" />
        ) : (
          <Image
            source={{uri: recipient.imgUrl}}
            className="rounded-full w-12 h-12"
          />
        )}
        {/* 사용자 정보 */}
        <View className="ml-4 gap-2">
          <Text className="text-xl">{recipient.name}</Text>
          <Text className="text-base">{formatPhoneNumber(recipient.phone)}</Text>
        </View>
      </View>
      {isSetting ? (
        <Pressable onPress={setOnSet}>
          <Setting />
        </Pressable>
      ) : (
        <View className="flex-row h-full py-4 items-end">
          <Text className="">
            {recipient.lastModified
              ? `마지막 수정 : ${calculateDate(recipient.lastModified)}`
              : ''}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
