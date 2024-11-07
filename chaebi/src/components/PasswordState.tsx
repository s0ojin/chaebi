import {View} from 'react-native';
import React from 'react';

interface PasswordStateProps {
  length: number;
};

export default function PasswordState({length}: PasswordStateProps) {
  return (
    <View className="items-center">
      <View className="flex-row gap-6">
        {[0, 1, 2, 3].map(index => (
          <View
            key={index}
            className={`w-6 h-6 rounded-full ${
              index < length ? 'bg-black' : 'bg-[#D9D9D9]'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
