import React from 'react';
import Text from '../../components/CustomText';
import {Pressable, View} from 'react-native';
import Header from '../../components/Header';
import SettingAdjustIcon from '../../assets/icon/settings-adjust.svg';
import MasonryGrid from '../../components/album/MasonryGrid';
import CrossIcon from '../../assets/icon/cross.svg';
import CenterModal from '../../components/modal/CustomCenterModal';
import {useModal} from '../../hooks/useModal';
import AlbumAccessModal from '../../components/modal/AlbumAccessModal';
import MediaUploadModal from '../../components/modal/MediaUploadModal';
import useAlbumStore from '../../stores/albumStore';
import TrashCanIcon from '../../assets/icon/trash-can.svg';

export default function AlbumScreen() {
  const albumAccessModal = useModal();
  const mediaUploadModal = useModal();
  const {isSelectMode, setIsSelectMode} = useAlbumStore();

  return (
    <>
      <View className="relative">
        <Header pageName="채우기" />
        <Pressable
          onPress={setIsSelectMode}
          className="bg-primary-400 self-start px-3 rounded-full absolute right-4 top-1/4">
          <Text className="text-_white py-2 px-1">
            {isSelectMode ? '취소' : '선택'}
          </Text>
        </Pressable>
      </View>
      <View className="mx-3">
        <Pressable className="bg-primary-400 rounded-full self-start flex-row items-center gap-1 px-5 py-[6px] my-4">
          <Text className="text-2xl text-_white">전체</Text>
          <SettingAdjustIcon />
        </Pressable>
        <MasonryGrid />
      </View>
      <Pressable
        onPress={albumAccessModal.openModal}
        className="bg-_white w-16 h-16 rounded-full absolute bottom-5 right-5 justify-center items-center">
        <CrossIcon
          style={{transform: [{rotate: '45deg'}]}}
          width={60}
          height={60}
        />
      </Pressable>
      {isSelectMode && (
        <Pressable className="bg-white w-full h-[72px] rounded-t-xl absolute bottom-0 justify-center items-center">
          <TrashCanIcon width={32} height={32} />
        </Pressable>
      )}

      <CenterModal
        visible={albumAccessModal.isVisible}
        onClose={albumAccessModal.closeModal}>
        <AlbumAccessModal
          closeModal={albumAccessModal.closeModal}
          mediaUploadModalOpenModal={mediaUploadModal.openModal}
        />
      </CenterModal>
      <CenterModal
        visible={mediaUploadModal.isVisible}
        onClose={mediaUploadModal.closeModal}>
        <MediaUploadModal closeModal={mediaUploadModal.closeModal} />
      </CenterModal>
    </>
  );
}
