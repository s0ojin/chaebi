import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface RoundButtonCompProps {
  content: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function RoundButtonComp({
  content,
  onPress,
  disabled = false,
}: RoundButtonCompProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        className={`rounded-lg py-5 ${
          disabled ? 'bg-[#bbbbbb]' : 'bg-[#444444]'
        }`}>
        <Text
          className={`font-['이서윤체'] text-2xl text-center ${
            disabled ? 'text-[#888888]' : 'text-white'
          }`}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
