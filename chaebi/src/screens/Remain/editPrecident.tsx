import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../components/CustomText';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import RoundButton from '../../components/RoundButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {Recipient} from './index';
import {RootStackParamList} from '../../types/navigator';
import { Route } from '@react-navigation/native';

type RemainWriteScreenProps = {
  route: Route<string, Recipient>;
  navigation: StackNavigationProp<RootStackParamList, 'RemainWrite'>;
};

// 직접 연락처 작성하는 페이지
export default function RemainEditPreScreen({
  route,
  navigation,
}: RemainWriteScreenProps) {
  const recipient: Recipient = route.params;
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  // 다음으로 넘어가서 열람용 인증질문 등록하기
  const [showNext, setShowNext] = useState<boolean>(false);

  useEffect(() => {
    if (recipient.name) {
      setName(recipient.name);
    }
    if (recipient.phone) {
      setPhoneNumber(recipient.phone);
    }
  }, []);

  useEffect(() => {
    function checkNumber(number: string): boolean {
      if (number.length === 11 && number.charAt(0) === '0') {
        return true;
      }
      return false;
    }
    if (name && checkNumber(phoneNumber)) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }
  }, [name, phoneNumber]);

  return (
    <View className="flex-1 bg-white">
      <Header pageName="열람인 등록하기" />
      <View className="flex-1 px-6 my-8 justify-between">
        {/* 입력 필드 */}
        <View className="flex-col gap-9">
          <View className="gap-5">
            <Text className="text-2xl">열람하실 분의 성함을 입력해주세요!</Text>
            <InputField
              placeholder="EX) 박채비"
              keyboardType="default"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View className="gap-5">
            <Text className="text-2xl">열람인의 전화번호를 입력해주세요!</Text>
            <InputField
              placeholder="휴대폰 번호"
              keyboardType="phone-pad"
              isPhoneNum={true}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        {/* 버튼 필드 */}
        <View className="block">
          <RoundButton
            content="다음"
            onPress={() => {
              recipient.name=name;
              recipient.phone=phoneNumber;
              navigation.navigate('RemainQuestion', recipient);
            }}
            disabled={!showNext}
          />
        </View>
      </View>
    </View>
  );
}