import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import HeaderComp from '../../components/HeaderComp';
import ModalComp from '../../components/ModalComp';
import Plus from '../../assets/icon/plus.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import ListComp from '../../components/ListComp';

interface Message {
  name: string;
  phone: string;
  imgUrl: string;
}

type AppIntroScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AppIntro'>;
};

export default function RemainScreen({navigation}: AppIntroScreenProps) {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [remainList, setRemainList] = useState<Message[]>([
    {name: '박채비', phone: '010-1234-5678', imgUrl: 'https://img.freepik.com/free-photo/smiling-asian-young-woman-face-portrait_53876-145636.jpg?t=st=1730783800~exp=1730787400~hmac=4accda94302bb0434feff19400f70ae0241f3d7c14e845733ab5ab2531a746b7&w=826'},
    {name: '박채비', phone: '010-1234-5678', imgUrl: ''},
    {name: '박채비', phone: '010-1234-5678', imgUrl: ''},
    {name: '박채비', phone: '010-1234-5678', imgUrl: ''},
  ]);

  return (
    <View className="bg-white flex-1">
      <ModalComp
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        showList={[
          {
            title: '연락처에서 받아오기',
            moveTo: function () {
              navigation.navigate('Contacts');
            },
          },
          {
            title: '직접 입력하기',
            moveTo: function () {
              navigation.navigate('RemainWrite');
            },
          },
        ]}
      />
      <HeaderComp pageName="남기기" />
      <View className="mt-8 gap-9">
        {remainList.length === 0 ? (
          <View className="flex-col px-6 gap-5 items-center">
            {/* 남긴 메시지가 없을 때 띄울 메시지 */}
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
              className="bg-gray-500 rounded-full w-12 h-12 justify-center items-center mt-5"
              onPress={() => setShowAuth(true)}>
              <Plus className="m-auto" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-col px-6 gap-5 items-center">
            {remainList.map((element, index) => (
              <ListComp message={element} />
            ))}
            <TouchableOpacity
              className="bg-gray-500 rounded-full w-16 h-16 justify-center items-center mt-5"
              onPress={() => setShowAuth(true)}>
              <Plus className="m-auto" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
