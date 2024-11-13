import {View, TouchableOpacity} from 'react-native';
import Text from './CustomText';
import React from 'react';

interface RoundButtonProps {
  content: string;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  fontColor?: string;
  border?: string;
}

export default function RoundButton({
  content,
  onPress,
  disabled = false,
  backgroundColor = 'bg-primary-400',
  fontColor = 'text-white',
  border,
}: RoundButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        className={`rounded-xl py-5 ${
          disabled ? 'bg-primary-200' : backgroundColor
        } ${border ? border : ''}`}>
        <Text
          className={`text-2xl text-center ${
            disabled ? 'text-primary-300' : fontColor
          }`}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
