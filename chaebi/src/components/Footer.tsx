import {View, Text, Pressable} from 'react-native';
import React from 'react';
import HomeIcon from '../assets/icon/home.svg';
import BoxIcon from '../assets/icon/box.svg';
import LayoutIcon from '../assets/icon/layout.svg';
import PersonIcon from '../assets/icon/person.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

interface FooterProps {
  // 이동할 경로
  currentPage: string;
  // 이동 시킬 네비게이션
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Footer({currentPage, navigation}: FooterProps) {
  return (
    <View className="flex-row items-center justify-between bg-white h-20 p-4">
      {currentPage === 'home' ? (
        <View className="items-center w-20">
          <HomeIcon width={32} height={32} color="#444444" />
          <Text className="text-xs text-center text-[#444444]">홈</Text>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            navigation.navigate('Main');
          }}
          className="items-center w-20">
          <HomeIcon width={32} height={32} color="#D2D2D2" />
          <Text className="text-xs text-center text-[#D2D2D2]">홈</Text>
        </Pressable>
      )}

      {currentPage === 'remain' ? (
        <View className="items-center w-20">
          <BoxIcon width={32} height={32} color="#444444" />
          <Text className="text-xs text-center text-[#444444]">남기기</Text>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            navigation.navigate('Remain');
          }}
          className="items-center w-20">
          <BoxIcon width={32} height={32} color="#D2D2D2" />
          <Text className="text-xs text-center text-[#D2D2D2]">남기기</Text>
        </Pressable>
      )}

      {currentPage === 'fill' ? (
        <View className="items-center w-20">
          <LayoutIcon width={32} height={32} color="#444444" />
          <Text className="text-xs text-center text-[#444444]">채우기</Text>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            // 채우기로 이동
            navigation.navigate('Album');
          }}
          className="items-center w-20">
          <LayoutIcon width={32} height={32} color="#D2D2D2" />
          <Text className="text-xs text-center text-[#D2D2D2]">채우기</Text>
        </Pressable>
      )}

      {currentPage === 'mypage' ? (
        <View className="items-center w-20">
          <PersonIcon width={32} height={32} color="#444444" />
          <Text className="text-xs text-center text-[#444444]">마이페이지</Text>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            // 마이페이지로 이동
            navigation.navigate;
          }}
          className="items-center w-20">
          <PersonIcon width={32} height={32} color="#D2D2D2" />
          <Text className="text-xs text-center text-[#D2D2D2]">마이페이지</Text>
        </Pressable>
      )}
    </View>
  );
}
