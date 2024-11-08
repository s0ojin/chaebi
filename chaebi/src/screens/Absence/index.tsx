import {View} from 'react-native';
import Text from '../../components/CustomText';
import React, {useEffect, useState} from 'react';
import Logo from '../../assets/logo/logo.svg';
import RoundButton from '../../components/RoundButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import WarningModal from '../../components/WarningModal'; // 모달 컴포넌트 import

type AbsenceScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Absence'>;
};

export default function AbsenceScreen({navigation}: AbsenceScreenProps) {
  // 모달 가시성 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername('박수진');
  }, []);

  return (
    <View className="flex-1 p-5">
      <View className="flex-1 justify-center items-center">
        <Logo width={150} height={120} />
        <Text className="text-2xl text-center mt-3">남은 이들을 위한 채비</Text>
        <Text className="text-2xl text-center mt-2">채우고, 비우기</Text>
      </View>
      <View className="justify-end w-full gap-5">
        <RoundButton
          content={`${username}님이신가요?`}
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        />
        <RoundButton
          content={'유족이신가요?'}
          onPress={() => {
            setModalVisible(true);
          }}
          backgroundColor={'bg-[#D9D9D9]'}
          fontColor={'text-[#444444]'}
          border={'border-2 border-[#444444]'}
        />
      </View>

      <WarningModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
}
