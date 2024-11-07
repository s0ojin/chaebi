import { View } from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../components/CustomText';
import HeaderComp from '../../components/Header';
import InputFieldComp from '../../components/InputField';
import RoundButtonComp from '../../components/RoundButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { Recipient } from './index';

type RemainWriteScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RemainWrite'>;
};

// 직접 연락처 작성하는 페이지
export default function RemainWriteScreen({navigation} : RemainWriteScreenProps) {
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  // 다음으로 넘어가서 열람용 인증질문 등록하기
  const [showNext, setShowNext] = useState<boolean>(false);

  useEffect(()=>{
    function checkNumber(number:string) : boolean{
      if(number.length === 13 && number.charAt(0) === '0') {
        return true;
      }
      return false;
    }
    if(name && checkNumber(phoneNumber)) {
      setShowNext(true)
    }else{
      setShowNext(false)
    }
  },[name, phoneNumber])

  return (
    <View className="flex-1 bg-white">
      <HeaderComp pageName="열람인 등록하기" />
      <View className="flex-1 px-6 my-8 justify-between">
        {/* 입력 필드 */}
        <View className='flex-col gap-9'>
          <View className="gap-5">
            <Text className="text-2xl">
              열람하실 분의 성함을 입력해주세요!
            </Text>
            <InputFieldComp
              placeholder="EX) 박채비"
              keyboardType="default"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View className="gap-5">
            <Text className="text-2xl">
              열람인의 전화번호를 입력해주세요!
            </Text>
            <InputFieldComp
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
          <RoundButtonComp
            content="다음"
            onPress={() => {navigation.navigate('RemainQuestion', {
              name: name,
              phone: phoneNumber,
            })}}
            disabled={!showNext}
          />
        </View>
      </View>
    </View>
  );
}
