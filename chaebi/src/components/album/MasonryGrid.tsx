import React from 'react';
import {ScrollView, View} from 'react-native';
import MasonryGridItem from './MasonryGridItem';
import {MasonryItem} from '../../types/album';

function MasonryGrid() {
  const data: MasonryItem[] = Array.from({length: 30}).map((_, index) => ({
    uri: `https://picsum.photos/id/${index + 30}/300`,
    id: index.toString(),
    height: 150 + Math.floor(Math.random() * 150),
  }));

  const columns: MasonryItem[][] = [[], []];
  data.forEach((item, index) => {
    columns[index % 2].push(item);
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between gap-2">
        {columns.map((column, colIndex) => (
          <View key={colIndex} className="flex-1">
            {column.map(item => (
              <MasonryGridItem key={item.id} image={item} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default React.memo(MasonryGrid);
