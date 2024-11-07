import {View} from 'react-native';
import Text from '../../components/CustomText';
import React from 'react';
import Cross from '../../assets/icon/cross.svg';
import CustomNumberpad from '../../components/CustomNumberpad';
import PasswordState from '../../components/PasswordState';

export default function SetPasswordScreen() {
  return (
    <View className="p-5">
      <View className="items-end">
        <Cross width={40} height={40} />
      </View>
      <Text className="mt-32 mb-16 text-center text-2xl">
        비밀번호를 입력해주세요.
      </Text>
      <PasswordState />
      <View className="my-16" />
      <CustomNumberpad />
    </View>
  );
}
