import React from 'react';
import {Pressable, View} from 'react-native';
import ClockIcon from '../assets/icon/clock.svg';
import SortLeftIcon from '../assets/icon/sort-left.svg';
// import SortCenterIcon from '../assets/icon/sort-center.svg';
import CheckIcon from '../assets/icon/check.svg';

export default function EditorInputAccessory() {
  const handleInsertCurrentTime = () => {};
  const handleToggleAlignment = () => {};
  const handleSaveLetter = () => {};

  return (
    <View className="flex flex-row gap-5 px-5 h-11 items-center">
      <Pressable onPress={handleInsertCurrentTime}>
        <ClockIcon />
      </Pressable>
      <Pressable onPress={handleToggleAlignment}>
        <SortLeftIcon />
      </Pressable>
      <Pressable onPress={handleSaveLetter} className="ml-auto">
        <CheckIcon width={32} height={32} />
      </Pressable>
    </View>
  );
}
