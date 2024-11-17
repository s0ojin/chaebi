import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import MasonryGridItem from './MasonryGridItem';
import {Media} from '../../types/album';
import {useModal} from '../../hooks/useModal';
import MediaCarouselModal from '../modal/MediaCarouselModal';

interface MasonryGridProps {
  mediaList: (Media & {height: number})[];
}

function MasonryGrid({mediaList}: MasonryGridProps) {
  const columns: (Media & {height: number})[][] = [[], []];
  mediaList.forEach((item, index) => {
    columns[index % 2].push(item);
  });

  const {isVisible, openModal, closeModal} = useModal();
  const [initialIndex, setInitialIndex] = useState(0);

  const handlePress = (itemIndex: number) => {
    setInitialIndex(itemIndex);
    openModal();
  };

  return (
    <View className="flex-row justify-between gap-2">
      {columns.map((column, colIndex) => (
        <View key={colIndex} className="flex-1">
          {column.map(item => (
            <Pressable
              onPress={() =>
                handlePress(mediaList.findIndex(media => media.id === item.id))
              }
              key={item.id}>
              <MasonryGridItem media={item} />
            </Pressable>
          ))}
        </View>
      ))}
      <MediaCarouselModal
        visible={isVisible}
        onClose={closeModal}
        mediaList={mediaList}
        initialIndex={initialIndex}
      />
    </View>
  );
}

export default React.memo(MasonryGrid);
