import React from 'react';
import {Image, Pressable, View} from 'react-native';
import Text from '../CustomText';
import RecipientTagList from '../album/RecipientTagList';
import useAlbumStore from '../../stores/albumStore';

export default function MediaUploadModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const {selectedMediaList} = useAlbumStore();

  return (
    <View className="p-5 min-w-80 items-center max-w-[80%] overflow-hidden">
      <Text className="text-2xl text-primary-400 ml-1 mb-3 self-start">
        누구에게 남길까요?
      </Text>

      <RecipientTagList />

      <View className="relative w-32 h-32 flex-row my-8">
        <View
          className="absolute top-0 left-0 w-full h-full bg-primary-200 rounded-lg"
          style={{zIndex: -2, transform: [{rotate: '-8deg'}]}}
        />
        <View
          className="absolute top-1 left-1 w-full h-full bg-primary-200 rounded-lg"
          style={{zIndex: -1, transform: [{rotate: '6deg'}]}}
        />
        <Image
          source={{
            uri: selectedMediaList[0]?.uri,
          }}
          className="w-full h-full rounded-lg"
        />
        <Text className="mt-2 text-primary-400 text-lg self-end ml-3">
          {`(${8}장)`}
        </Text>
      </View>

      <View className="flex-row gap-2 h-11">
        <Pressable
          onPress={() => {
            closeModal();
            // TODO: 앨범 상태 날리기
          }}
          className="bg-primary-200 flex-1 rounded-lg justify-center">
          <Text className="text-base text-primary-400 text-center">취소</Text>
        </Pressable>
        <Pressable className="bg-primary-400 flex-1 rounded-lg justify-center">
          <Text className="text-base text-_white text-center">채우기</Text>
        </Pressable>
      </View>
    </View>
  );
}
