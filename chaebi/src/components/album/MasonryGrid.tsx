import React from 'react';
import {Image, ScrollView, View} from 'react-native';

type MasonryItem = {
  uri: string;
  id: string;
  height: number;
};

export default function MasonryGrid() {
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
              <Image
                key={item.id}
                source={{uri: item.uri}}
                className="rounded-lg mb-2"
                style={{height: item.height}}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
