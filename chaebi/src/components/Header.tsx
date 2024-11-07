import {View, Text} from 'react-native';
import React from 'react';
import ArrowLeftIcon from '../assets/icon/arrow-left.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

interface HeaderCompProps {
  pageName: string;
}

export default function HeaderComp({pageName}: HeaderCompProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="px-4 py-5 flex-row items-center">
      <ArrowLeftIcon width={24} height={24} onPress={() => navigation.goBack()} />
      <Text className="text-xl font-bold ml-2 -mb-0.5 font-['NotoSansKR']">
        {pageName}
      </Text>
    </View>
  );
}
