import React, {useState, useRef} from 'react';
import {Pressable, ScrollView} from 'react-native';
import Text from '../CustomText';
import SettingAdjustIcon from '../../assets/icon/settings-adjust.svg';
import useAlbumStore from '../../stores/albumStore';
import {useQuery} from '@tanstack/react-query';
import {getRecipientList} from '../../api/album';

export default function RecipientFilterBtn() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('전체'); // 선택된 버튼 텍스트 상태
  const scrollViewRef = useRef(null);
  const {setSelectedRecipientIdForFilter} = useAlbumStore();

  const {data: recipientList = []} = useQuery({
    queryKey: ['recipientList'],
    queryFn: getRecipientList,
  });

  const handleSelect = (item, index) => {
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
      className="flex-row shrink-0">
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
              onPress={() => handleSelect(item, index + 1)} // '전체' 버튼을 고려한 인덱스
            >
              <Text className="text-2xl text-_white">{item.name}</Text>
            </Pressable>
          ))}
        </>
      )}
    </ScrollView>
  );
}
