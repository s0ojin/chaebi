import React from 'react';
import {Image, View} from 'react-native';
import useAlbumStore from '../../stores/albumStore';
import CheckIcon from '../../assets/icon/check.svg';
import {Media} from '../../types/album';

interface MasonryGridItemProps {
  media: Media & {height: number};
}

export default function MasonryGridItem({media}: MasonryGridItemProps) {
  const {isSelectMode, selectedAppMediaList} = useAlbumStore();
  const isSelected = selectedAppMediaList.includes(media.id);

  return (
    <View className="relative">
      <View>
        <Image
          source={{uri: media.fileUrl}}
          className="rounded-lg mb-2"
          style={{height: media.height}}
        />
        {isSelectMode && isSelected && (
          <View className="bg-_white/50 absolute right-0 top-0 z-10 w-full h-full" />
        )}
      </View>
      {isSelectMode && (
        <View
          className={`${
            isSelected ? 'bg-primary-400' : 'bg-primary-200'
          } w-6 h-6 rounded-full absolute right-2 bottom-4 border-[1.5px] border-_white justify-center items-center z-20`}>
          <CheckIcon color="#f4f4f4" />
        </View>
      )}
    </View>
  );
}
