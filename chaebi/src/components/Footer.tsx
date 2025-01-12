import {View, Text, Pressable} from 'react-native';
import React from 'react';
import HomeIcon from '../assets/icon/home.svg';
import BoxIcon from '../assets/icon/box.svg';
import LayoutIcon from '../assets/icon/layout.svg';
import PersonIcon from '../assets/icon/person.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigator';

interface FooterProps {
  currentPage: 'home' | 'remain' | 'mypage' | 'album';
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Footer({currentPage, navigation}: FooterProps) {
  return (
    <View className="flex-row items-center justify-between bg-white h-[74px] p-4 rounded-t-xl">
      {currentPage === 'home' ? (
        <View className="items-center w-20">
          <HomeIcon width={32} height={32} color="#444444" />
          <Text className="text-xs text-center text-primary-400">홈</Text>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            navigation.replace('Main');
          }}
          className="items-center w-20">
          <HomeIcon width={32} height={32} color="#D2D2D2" />
          <Text className="text-xs text-center text-[#D2D2D2]">홈</Text>
        </Pressable>
      )}

      {currentPage === 'remain' ? (
        <View className="items-center w-20">
          <BoxIcon width={32} height={32} color="#444444" />
          <Text className="text-xs text-center text-primary-400">남기기</Text>
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

      {currentPage === 'album' ? (
        <View className="items-center w-20">
          <LayoutIcon width={32} height={32} color="#444444" />
          <Text className="text-xs text-center text-primary-400">채우기</Text>
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
          <Text className="text-xs text-center text-primary-400">마이페이지</Text>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            // 마이페이지로 이동
            navigation.navigate('Setting');
          }}
          className="items-center w-20">
          <PersonIcon width={32} height={32} color="#D2D2D2" />
          <Text className="text-xs text-center text-[#D2D2D2]">마이페이지</Text>
        </Pressable>
      )}
    </View>
  );
}
