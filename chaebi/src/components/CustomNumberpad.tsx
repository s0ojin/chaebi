// CustomNumberpad.tsx
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from './CustomText';
import Backspace from '../assets/icon/dark-backspace.svg';

interface CustomNumberpadProps {
  onNumberPress: (num: string) => void;
  onBackspacePress: () => void;
  disabled?: boolean;
}

const CustomNumberpad: React.FC<CustomNumberpadProps> = ({
  onNumberPress,
  onBackspacePress,
  disabled,
}) => {
  const renderNumber = (num: string) => (
    <TouchableOpacity
      key={num}
      onPress={() => onNumberPress(num)}
      className="w-36"
      disabled={disabled}>
      {disabled ? (
        <Text className="text-center text-3xl color-primary-300">{num}</Text>
      ) : (
        <Text className="text-center text-3xl color-_black">{num}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="items-center">
      <View className="flex-row h-24">{['1', '2', '3'].map(renderNumber)}</View>
      <View className="flex-row h-24">{['4', '5', '6'].map(renderNumber)}</View>
      <View className="flex-row h-24">{['7', '8', '9'].map(renderNumber)}</View>
      <View className="flex-row h-24">
        <View className="w-36" />
        {renderNumber('0')}
        <TouchableOpacity
          onPress={onBackspacePress}
          className="w-36 items-center mt-2">
          <Backspace width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomNumberpad;
