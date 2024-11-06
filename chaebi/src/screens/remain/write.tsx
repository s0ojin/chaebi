import {View, Text} from 'react-native';
import React, {useState} from 'react';
import HeaderComp from '../../components/HeaderComp';
import InputFieldComp from '../../components/InputFieldComp';
import RoundButtonComp from '../../components/RoundButtonComp';

export default function RemainWriteScreen() {
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  // 다음으로 넘어가서 열람용 인증질문 등록하기
  const [showNext, setShowNext] = useState<boolean>(false);

  return (
    <View className="flex-1 bg-white">
      <HeaderComp pageName="열람인 등록하기" />
      <View className="mt-12 gap-9">
        <View className="px-6 gap-5">
          <Text className="text-2xl font-['이서윤체']">
            열람하실 분의 성함을 입력해주세요!
          </Text>
          <InputFieldComp
            placeholder="EX) 박채비"
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="px-6 gap-5">
          <Text className="text-2xl font-['이서윤체']">
            열람인의 전화번호를 입력해주세요!
          </Text>
          <InputFieldComp
            placeholder="휴대폰 번호"
            keyboardType="phone-pad"
            isPhoneNum={true}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <RoundButtonComp
            content="다음"
            onPress={() => setShowNext(true)}
            disabled={showNext}
          />
        </View>
      </View>
    </View>
  );
}
