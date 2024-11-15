import React from 'react';
import {ScrollView, View} from 'react-native';
import MasonryGridItem from './MasonryGridItem';
import {Media} from '../../types/album';

interface MasonryGridProps {
  mediaList: (Media & {height: number})[];
}

function MasonryGrid({mediaList}: MasonryGridProps) {
  const columns: (Media & {height: number})[][] = [[], []];
  mediaList.forEach((item, index) => {
    columns[index % 2].push(item);
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between gap-2">
        {columns.map((column, colIndex) => (
          <View key={colIndex} className="flex-1">
            {column.map(item => (
              <MasonryGridItem key={item.id} media={item} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default React.memo(MasonryGrid);
