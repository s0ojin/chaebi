import React from 'react';
import {View, Pressable, ScrollView} from 'react-native';
import Text from '../CustomText';
import useAlbumStore from '../../stores/albumStore';
import {useQuery} from '@tanstack/react-query';
import {getRecipientList} from '../../api/recipient';

export default function RecipientTagList() {
  const {data: recipientList} = useQuery({
    queryKey: ['recipientList'],
    queryFn: getRecipientList,
  });

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
    if (selectedRecipientIdList.length === recipientList?.length) {
      setAllRecipients([]);
    } else if (recipientList) {
      setAllRecipients(recipientList.map(item => item.id));
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
            selectedRecipientIdList.length === recipientList?.length
              ? 'bg-primary-400'
              : 'bg-primary-200'
          } py-[5px] px-5 rounded-full mr-2`}>
          <Text
            className={`text-xl ${
              selectedRecipientIdList.length === recipientList?.length
                ? 'text-_white'
                : 'text-primary-300'
            }`}>
            모두
          </Text>
        </Pressable>
        {recipientList?.map(item => (
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
