import {View, Text, Image} from 'react-native';
import React from 'react';
import {BANNER_CONTENTS} from '../../constants/main';

interface BannerContentProps {
  contentPage: number;
}

export default function BannerContent({contentPage}: BannerContentProps) {
  return (
    <View
      className="bg-[#BAC3D0] rounded-2xl justify-center p-6">
      <Text className="text-3xl font-leeseoyoon">
        {BANNER_CONTENTS[contentPage].title}
      </Text>
      <Text className="text-gray-600">{BANNER_CONTENTS[contentPage].body}</Text>
      <Image
        className="absolute right-8"
        source={require('../../assets/icon/saly.png')}
      />
      <View className="absolute bottom-3 right-3 bg-[#8E9299] rounded-full py-1 px-3">
        <Text className="text-white">{contentPage + 1}/2</Text>
      </View>
    </View>
  );
}
