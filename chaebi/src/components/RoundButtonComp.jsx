import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function RoundButtonComp({content, onPress}) {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={{
          backgroundColor: '#444444',
          borderRadius: 12,
          paddingVertical: 22,
        }}>
        <Text
          style={{
            fontFamily: '이서윤체',
            fontSize: 24,
            color: '#ffffff',
            textAlign: 'center',
          }}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
