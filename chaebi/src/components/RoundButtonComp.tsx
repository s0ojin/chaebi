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
        style={{
          backgroundColor: disabled ? '#bbbbbb' : '#444444',
          borderRadius: 12,
          paddingVertical: 22,
        }}>
        <Text
          style={{
            fontFamily: '이서윤체',
            fontSize: 24,
            textAlign: 'center',
            color: disabled ? '#888888' : '#ffffff',
          }}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
