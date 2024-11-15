import React from 'react';
import {Image, View} from 'react-native';
import useAlbumStore from '../../stores/albumStore';
// import MediaSelectBtn from './MediaSelectBtn';
import {MasonryItem} from '../../types/album';
import CheckIcon from '../../assets/icon/check.svg';

export default function MasonryGridItem({image}: {image: MasonryItem}) {
  const {isSelectMode} = useAlbumStore();
  return (
    <View className="relative">
      <Image
        source={{uri: image.uri}}
        className="rounded-lg mb-2"
        style={{height: image.height}}
      />
      {isSelectMode && (
        <View className="w-6 h-6 rounded-full absolute right-2 bottom-4 bg-primary-200 border-[1.5px] border-_white justify-center items-center">
          <CheckIcon color="#f4f4f4" />
        </View>
      )}
    </View>
  );
}
