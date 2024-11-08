import {View} from 'react-native';
import React from 'react';
import Text from '../../components/CustomText';
import {Recipient} from '.';
import {Route} from '@react-navigation/native';
import Header from '../../components/Header';
import RoundButton from '../../components/RoundButton';
import DecoTopIcon from '../../assets/icon/deco-top.svg';
import DecoBotIcon from '../../assets/icon/deco-bottom.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

type CompleteScreenProps = {
  route: Route<string, Recipient>;
  navigation: StackNavigationProp<RootStackParamList, 'RemainQuestion'>;
};

// 질문을 작성하는 페이지
export default function CompleteScreen({
  route,
  navigation,
}: CompleteScreenProps) {
  const recipient: Recipient = route.params;

  return (
    <View className="flex-1 bg-white">
      <Header pageName="열람인 등록하기" />
      <View className="flex-1 px-6 my-8 justify-between">
        {/* 입력 필드 */}
        <View className="flex-col items-center gap-4">
          <Text className="text-2xl text-center">
            열람인 등록이 완료되었습니다!
          </Text>
          <DecoTopIcon />
          <View className="gap-3">
            <Text className="text-2xl text-center">{recipient.name}</Text>
            <Text className="text-xl text-center">{recipient.phone}</Text>
            <Text className="text-xl text-center">{`Q: ${recipient.secretQuestion}`}</Text>
            <Text className="text-xl text-center">{`A: ${recipient.secretAnswer}`}</Text>
          </View>
          <DecoBotIcon />
        </View>

        {/* 버튼 필드 */}
        <View className="mt-4 gap-5 ]">
          <RoundButton
            content={`${recipient.name} 님께 편지 남기기`}
            onPress={() => {
              // 편지 작성 페이지로 이동하기
              navigation.navigate;
            }}
          />
          <RoundButton
            content="다음에 남기기"
            backgroundColor={'bg-[#D9D9D9]'}
            fontColor={'text-[#444444]'}
            onPress={() => {
              // 열람인 리스트로 이동하기
              navigation.navigate('Remain');
            }}
          />
        </View>
      </View>
    </View>
  );
}
