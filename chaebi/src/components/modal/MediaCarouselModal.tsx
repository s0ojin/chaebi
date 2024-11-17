import React from 'react';
import {Modal, View, Pressable, Image} from 'react-native';
import CrossIcon from '../../assets/icon/cross.svg';
import Carousel from 'react-native-reanimated-carousel';
import {Dimensions} from 'react-native';
import {Media} from '../../types/album';

interface MediaCarouselModalProps {
  visible: boolean;
  onClose: () => void;
  mediaList: Media[];
  initialIndex: number;
}

export default function MediaCarouselModal({
  visible,
  onClose,
  mediaList,
  initialIndex,
}: MediaCarouselModalProps) {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable onPress={onClose} className="absolute top-4 right-4 z-10 p-2">
        <CrossIcon width={44} height={44} color="#fafafa" />
      </Pressable>
      <View className="flex-1 bg-black">
        <Carousel
          loop={false}
          width={screenWidth}
          height={screenHeight}
          autoPlay={false}
          data={mediaList}
          defaultIndex={initialIndex}
          renderItem={({item}) => (
            <View className="w-full flex-1 justify-center -translate-y-12">
              <Image
                source={{uri: item.fileUrl}}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
          )}
        />
      </View>
    </Modal>
  );
}
