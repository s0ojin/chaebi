import React from 'react';
import {View, Pressable, ScrollView} from 'react-native';
import {Recipient} from '../../types/remain';
import Text from '../CustomText';
import useAlbumStore from '../../stores/albumStore';

const dummy: Recipient[] = [
  {
    id: 2,
    name: '박수진',
    phone: '111-1111-1111',
    imgUrl: '',
    secretQuestion: '',
    secretAnswer: '',
    lastModified: '',
  },
  {
    id: 3,
    name: '한아름송이',
    phone: '222-2222-2222',
    imgUrl: '',
    secretQuestion: '',
    secretAnswer: '',
    lastModified: '',
  },
  {
    id: 4,
    name: '석석바오',
    phone: '222-2222-2222',
    imgUrl: '',
    secretQuestion: '',
    secretAnswer: '',
    lastModified: '',
  },
];

export default function RecipientTagList() {
  const {
    selectedRecipientIdList,
    removeRecipientsId,
    addRecipientsId,
    setAllRecipients,
  } = useAlbumStore();

  const handleToggleRecipient = (recipientId: number) => {
    if (selectedRecipientIdList.includes(recipientId)) {
      removeRecipientsId(recipientId);
    } else {
      addRecipientsId(recipientId);
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedRecipientIdList.length === dummy.length) {
      setAllRecipients([]);
    } else {
      setAllRecipients(dummy.map(item => item.id));
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="max-h-12 flex-row"
      contentContainerStyle={{alignItems: 'center'}}>
      <View className="flex-row">
        <Pressable
          onPress={handleToggleSelectAll}
          className={`${
            selectedRecipientIdList.length === dummy.length
              ? 'bg-primary-400'
              : 'bg-primary-200'
          } py-[5px] px-5 rounded-full mr-2`}>
          <Text
            className={`text-xl ${
              selectedRecipientIdList.length === dummy.length
                ? 'text-_white'
                : 'text-primary-300'
            }`}>
            모두
          </Text>
        </Pressable>
        {dummy.map(item => (
          <Pressable
            key={item.id}
            onPress={() => handleToggleRecipient(item.id)}
            className={`${
              selectedRecipientIdList.includes(item.id)
                ? 'bg-primary-400'
                : 'bg-primary-200'
            } py-[5px] px-5 rounded-full mr-2`}>
            <Text
              className={`${
                selectedRecipientIdList.includes(item.id)
                  ? 'text-_white'
                  : 'text-primary-300'
              }  text-xl`}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
