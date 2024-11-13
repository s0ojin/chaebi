import {View, TouchableOpacity, FlatList} from 'react-native';
import Text from '../../components/CustomText';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import Modal from '../../components/CustomModal';
import {ModalElement} from '../../components/CustomModal';
import Plus from '../../assets/icon/plus.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import RecipientCard from '../../components/RecipientCard';
import Footer from '../../components/Footer';
import {NO_ONE_HEADLINE, NO_ONE_INFO} from '../../constants/remain';
import {deleteRecipient, getRecipient} from '../../api/recipient';

export interface Recipient {
  id?: number;
  name: string;
  phone: string;
  secretQuestion?: string;
  secretAnswer?: string;
  imgUrl?: string;
  lastModifiedDate?: string;
}

export interface Message {
  id?: number;
  content: string;
  userId?: number;
  recipient: Recipient;
  lastModifiedDate: string;
  sort: string;
}

type AppIntroScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Remain'>;
};

export default function RemainScreen({navigation}: AppIntroScreenProps) {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [recipientList, setRecipientList] = useState<Recipient[]>([]);
  const [moveToList, setMoveToList] = useState<ModalElement[]>([]);

  useEffect(() => {
    getRecipient()
      .then(data => {
        setRecipientList(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View className="bg-white flex-1 p-4">
      <Modal
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        showList={moveToList}
      />
      <Header pageName="남기기" />
      <View className="flex-1 mt-2 gap-9">
        {recipientList.length === 0 ? (
          <View className="flex-col px-6 gap-5 items-center">
            {/* 남긴 메시지가 없을 때 띄울 메시지 */}
            <Text className="text-center text-xl">{NO_ONE_HEADLINE}</Text>
            <Text className="text-center text-lg">{NO_ONE_INFO}</Text>
            <TouchableOpacity
              className="bg-gray-500 rounded-full w-16 h-16 justify-center items-center mt-5"
              onPress={() => {
                setMoveToList([
                  {
                    title: '연락처에서 받아오기',
                    moveTo: () => {
                      navigation.navigate('Contacts');
                    },
                  },
                  {
                    title: '직접 입력하기',
                    moveTo: () => {
                      navigation.navigate('RemainWrite');
                    },
                  },
                ]);
                setShowAuth(true);
              }}>
              <Plus className="m-auto" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 items-center">
            <FlatList
              data={recipientList}
              keyExtractor={item => item.id?.toString() ?? item.name}
              renderItem={({item}) => (
                <View className="my-2">
                  <RecipientCard
                    recipient={item}
                    isSetting={true}
                    setOnPress={() => {
                      setMoveToList([
                        {
                          title: '편지 수정하기',
                          moveTo: () => {
                            navigation.navigate('RemainEditor');
                          },
                        },
                        {
                          title: '편지 삭제하기',
                          moveTo: () => {
                            // 편지삭제 API
                            if(item.id) deleteRecipient(item.id);
                          },
                        },
                      ]);
                      setShowAuth(true);
                      console.log(showAuth);
                    }}
                    setOnSet={() => {
                      setMoveToList([
                        {
                          title: '질문 수정하기',
                          moveTo: () => {
                            navigation.navigate('RemainQuestion', item);
                          },
                        },
                        {
                          title: '수신인 삭제하기',
                          moveTo: () => {
                            if(item.id) deleteRecipient(item.id);
                          },
                        },
                      ]);
                      setShowAuth(true);
                    }}
                  />
                </View>
              )}
            />
            <TouchableOpacity
              className="absolute bottom-4 right-8 bg-gray-500 rounded-full w-14 h-14 justify-center items-center"
              onPress={() => {
                setMoveToList([
                  {
                    title: '연락처에서 받아오기',
                    moveTo: () => {
                      navigation.navigate('Contacts');
                    },
                  },
                  {
                    title: '직접 입력하기',
                    moveTo: () => {
                      navigation.navigate('RemainWrite');
                    },
                  },
                ]);
                setShowAuth(true);
              }}>
              <Plus className="m-auto" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Footer currentPage="remain" navigation={navigation}></Footer>
    </View>
  );
}
