import {View, TouchableOpacity} from 'react-native';
import Text from '../../components/CustomText';
import React, {useState} from 'react';
import HeaderComp from '../../components/HeaderComp';
import ModalComp from '../../components/ModalComp';
import Plus from '../../assets/icon/plus.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import ListComp from '../../components/ListComp';

export interface Recipient {
  id?: number;
  name: string;
  phone: string;
  imgUrl?: string;
}

export interface Message {
  id?: number;
  title: string;
  userId?: number;
  recipient: Recipient;
  lastModifiedDate: string;
  // true가 중간정렬?
  sort: boolean;
}

type AppIntroScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AppIntro'>;
};

export default function RemainScreen({navigation}: AppIntroScreenProps) {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [remainList, setRemainList] = useState<Message[]>(JSON.parse(`[
    {
      "id": 1,
      "content": "잘가시게",
      "userId": 1,
      "recipient": {
        "id": 1,
        "name": "장비",
        "phone": "010-1111-1111",
        "imgUrl": null
      },
      "lastModifiedDate": "2024-11-05T18:03:01.519939",
      "sort": true
    },
    {
      "id": 2,
      "content": "잘가시게",
      "userId": 1,
      "recipient": {
        "id": 2,
        "name": "관우",
        "phone": "010-1111-1112",
        "imgUrl": null
      },
      "lastModifiedDate": "2024-11-06T10:03:11.653246",
      "sort": true
    }
  ]`));

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
            <Text className="text-center text-xl">
              아직 추가된 열람인이 없습니다!
            </Text>
            <Text className="text-center text-lg">
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
              <ListComp key={index} message={element} isSetting={true} />
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
