import {View, Text} from 'react-native';
import React from 'react';
import ArrowLeft from '../assets/icon/arrow-left.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App'; // App.tsx에 RootStackParamList 정의가 필요

interface HeaderCompProps {
  pageName: string;
}

export default function HeaderComp({pageName}: HeaderCompProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <ArrowLeft width={24} height={24} onPress={() => navigation.goBack()} />
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'NotoSansKR',
          fontWeight: 'bold',
          marginLeft: 10,
          marginBottom: 1,
        }}>
        {pageName}
      </Text>
    </View>
  );
}
