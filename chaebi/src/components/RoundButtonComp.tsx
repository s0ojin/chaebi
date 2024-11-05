import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface RoundButtonCompProps {
  content: string;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  fontColor?: string;
  border?: string;
}

export default function RoundButtonComp({
  content,
  onPress,
  disabled = false,
  backgroundColor = 'bg-[#444444]',
  fontColor = 'text-[#ffffff]',
  border,
}: RoundButtonCompProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        className={`rounded-lg py-5 ${
          disabled ? 'bg-[#bbbbbb]' : backgroundColor
        } ${border ? border : ''}`}>
        <Text
          className={`font-['이서윤체'] text-2xl text-center ${
            disabled ? 'text-[#888888]' : fontColor
          }`}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
