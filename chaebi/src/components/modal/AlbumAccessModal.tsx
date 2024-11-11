import React from 'react';
import {Pressable, View} from 'react-native';
import Text from '../CustomText';
import {ALBUM_ACCESS} from '../../constants/album';
import {AlbumAccessOptions} from '../../types/album';

export default function AlbumAccessModal() {
  const handleOptionPress = (option: AlbumAccessOptions) => {
    switch (option) {
      case 'ALBUM':
        break;
      case 'CAMERA':
        break;
      case 'FILE':
        break;
    }
  };

  return (
    <View className="items-center px-5 py-2">
      {ALBUM_ACCESS.map((option, idx) => (
        <>
          <Pressable
            key={option.key}
            onPress={() => handleOptionPress(option.key)}
            className="text-xl p-4 text-_black">
            <Text>{option.label}</Text>
          </Pressable>
          {idx !== ALBUM_ACCESS.length - 1 && (
            <View className="h-[0.5px] w-full bg-primary-200" />
          )}
        </>
      ))}
    </View>
  );
}
