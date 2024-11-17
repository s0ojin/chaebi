import React, {useState, useRef} from 'react';
import {Pressable, ScrollView} from 'react-native';
import Text from '../CustomText';
import SettingAdjustIcon from '../../assets/icon/settings-adjust.svg';
import useAlbumStore from '../../stores/albumStore';
import {useQuery} from '@tanstack/react-query';
import {getRecipientList} from '../../api/album';
import {Recipient} from '../../types/remain';

export default function RecipientFilterBtn() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('전체');
  const scrollViewRef = useRef<ScrollView | null>(null);
  const {setSelectedRecipientIdForFilter} = useAlbumStore();

  const {data: recipientList = []} = useQuery({
    queryKey: ['recipientList'],
    queryFn: getRecipientList,
  });

  const handleSelect = (
    item: Recipient | {id: null; name: string},
    index: number,
  ) => {
    setSelectedRecipient(item.name);
    setSelectedRecipientIdForFilter(item.id || null);
    setIsFilterOpen(false);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * 150,
        animated: true,
      });
    }
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'center'}}
      className="flex-row shrink-0 max-h-20">
      <Pressable
        onPress={handleFilterToggle}
        className="bg-primary-400 rounded-full flex-row items-center gap-1 px-5 py-[6px] my-4 mr-2">
        <Text className="text-2xl text-_white">{selectedRecipient}</Text>
        <SettingAdjustIcon />
      </Pressable>

      {isFilterOpen && (
        <>
          <Pressable
            className="bg-primary-400 rounded-full flex-row items-center gap-1 px-5 py-[6px] my-4 mr-2"
            onPress={() => handleSelect({id: null, name: '전체'}, 0)}>
            <Text className="text-2xl text-_white">전체</Text>
          </Pressable>
          {recipientList.map((item, index) => (
            <Pressable
              key={item.id}
              className="bg-primary-400 rounded-full flex-row items-center gap-1 px-5 py-[6px] my-4 mr-2"
              onPress={() => handleSelect(item, index + 1)}>
              <Text className="text-2xl text-_white">{item.name}</Text>
            </Pressable>
          ))}
        </>
      )}
    </ScrollView>
  );
}
