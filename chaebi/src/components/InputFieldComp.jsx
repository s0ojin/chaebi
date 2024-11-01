import {View, TextInput} from 'react-native';
import React from 'react';

export default function InputFieldComp({placeholder, keyboardType}) {
  return (
    <View
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: 12,
        paddingVertical: 10,
      }}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={{
          fontFamily: '이서윤체',
          fontSize: 24,
          padding: 16,
        }}
      />
    </View>
  );
}
