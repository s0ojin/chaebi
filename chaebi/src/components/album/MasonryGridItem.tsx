import React from 'react';
import {Image, View} from 'react-native';
import useAlbumStore from '../../stores/albumStore';
import CheckIcon from '../../assets/icon/check.svg';
import {Media} from '../../types/album';

interface MasonryGridItemProps {
  media: Media & {height: number};
}

export default function MasonryGridItem({media}: MasonryGridItemProps) {
  const {isSelectMode} = useAlbumStore();
  return (
    <View className="relative">
      <Image
        source={{uri: media.fileUrl}}
        className="rounded-lg mb-2"
        style={{height: media.height}}
      />
      {isSelectMode && (
        <View className="w-6 h-6 rounded-full absolute right-2 bottom-4 bg-primary-200 border-[1.5px] border-_white justify-center items-center">
          <CheckIcon color="#f4f4f4" />
        </View>
      )}
    </View>
  );
}
