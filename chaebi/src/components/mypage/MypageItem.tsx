import {Pressable, View} from 'react-native';
import Text from '../CustomText';
import React from 'react';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  destination?: string;
  onPress?: () => void;
  content?: React.ReactNode;
  disabled?: boolean;
  navigation?: any;
}

export default function SettingItem({
  icon,
  title,
  destination,
  onPress,
  content,
  disabled,
  navigation,
}: SettingItemProps) {
  return (
    <Pressable
      className="h-20 bg-_white flex-row px-6 items-center justify-between"
      onPress={() => {
        onPress ? onPress() : navigation.navigate(destination);
      }}
      disabled={disabled}>
      <View className="flex-row py-4 items-center">
        <View className="w-6 h-6 mx-4 mr-8">{icon}</View>
        {disabled ? (
          <Text className="text-2xl color-primary-300">{title}</Text>
        ) : (
          <Text className="text-2xl">{title}</Text>
        )}
      </View>
      <View className="p-4">{content}</View>
    </Pressable>
  );
}
