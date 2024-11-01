import { View, Text } from 'react-native';
import React from 'react';
import ArrowLeft from '../assets/icon/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';

export default function HeaderComp({ pageName }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {/* <ArrowLeft width={24} height={24} onPress={() => navigation.goBack()} /> */}
      <Text style={{ fontSize: 20, marginLeft: 10 }}>{pageName}</Text>
    </View>
  );
}
