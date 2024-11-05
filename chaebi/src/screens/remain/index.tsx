import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import HeaderComp from '../../components/HeaderComp';
import ModalComp from '../../components/ModalComp';
import Plus from '../../assets/icon/plus.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

interface ShowListItem {
  title: string;
  moveTo: () => void;
}

type AppIntroScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AppIntro'>;
};

export default function RemainScreen({navigation}: AppIntroScreenProps) {
  const [showAuth, setShowAuth] = useState<boolean>(false);

  return (
    <View className="bg-white flex-1">
      <ModalComp
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        showList={[
          {title: '연락처에서 받아오기', moveTo: function(){navigation.navigate('Contacts')}},
          {title: '직접 입력하기', moveTo: function(){navigation.navigate('RemainWrite')}},
        ]}
      />
      <HeaderComp pageName="남기기" />
      <View className="mt-8 gap-9">
        <View className="flex-col px-6 gap-5 items-center">
          <Text className="text-center text-[24px] font-[이서윤체]">
            아직 추가된 열람인이 없습니다!
          </Text>
          <Text className="text-center text-[20px] font-[이서윤체]">
            열람인은 내가 떠나고 난 뒤, {'\n'}
            기록을 전달받을 사람입니다. {'\n'}
            {'\n'}
            버튼을 눌러 열람인을 지정해보세요!
          </Text>
          <TouchableOpacity
            className="bg-gray-500 rounded-full w-24 h-24 justify-center items-center mt-5"
            onPress={() => setShowAuth(true)}>
            <Plus className="m-auto" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};