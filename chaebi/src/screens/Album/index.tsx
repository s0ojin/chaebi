import React from 'react';
import {FlatList, View, ActivityIndicator, Pressable} from 'react-native';
import Header from '../../components/Header';
import CrossIcon from '../../assets/icon/cross.svg';
import CenterModal from '../../components/modal/CustomCenterModal';
import AlbumAccessModal from '../../components/modal/AlbumAccessModal';
import MediaUploadModal from '../../components/modal/MediaUploadModal';
import useAlbumStore from '../../stores/albumStore';
import TrashCanIcon from '../../assets/icon/trash-can.svg';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getMediaList} from '../../api/album';
import MasonryGrid from '../../components/album/MasonryGrid';
import seedrandom from 'seedrandom';
import {useModal} from '../../hooks/useModal';
import {AlbumListResWithHeight, Media} from '../../types/album';
import RecipientFilterBtn from '../../components/album/RecipientFilterBtn';
import Text from '../../components/CustomText';
import MediaDeleteModal from '../../components/modal/MediaDeleteModal';

export default function AlbumScreen() {
  const {
    isSelectMode,
    setIsSelectMode,
    selectedRecipientIdForFilter,
    clearSelectedAppMediaList,
  } = useAlbumStore();
  const albumAccessModal = useModal();
  const mediaUploadModal = useModal();
  const mediaDeleteModal = useModal();

  const {
    data: MediaList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['mediaList', selectedRecipientIdForFilter],
    queryFn: ({pageParam}) => getMediaList(pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    select: data => ({
      ...data,
      pages: data.pages.map(page => ({
        ...page,
        content: page.content
          .filter((item: Media) => {
            const recipients = item.recipients || [];
            return (
              selectedRecipientIdForFilter === null ||
              recipients.some(
                recipient =>
                  recipient.recipientId === selectedRecipientIdForFilter,
              )
            );
          })
          .map((item: Media) => {
            const seed = `${item.id}-${item.fileName}-${item.createdDate}`;
            const rng = seedrandom(seed);
            return {
              ...item,
              height: 150 + Math.floor(rng() * 150),
            };
          }),
      })),
    }),
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <View className="relative">
        <Header pageName="채우기" />
        <Pressable
          onPress={() => {
            if (isSelectMode) {
              clearSelectedAppMediaList();
            }
            setIsSelectMode();
          }}
          className="bg-primary-400 self-start px-3 rounded-full absolute right-4 top-1/4">
          <Text className="text-_white py-2 px-1">
            {isSelectMode ? '취소' : '선택'}
          </Text>
        </Pressable>
      </View>
      <View className="mx-3">
        <RecipientFilterBtn />
      </View>
      <View className="mx-3 flex-1">
        <FlatList
          data={MediaList?.pages || []}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}: {item: AlbumListResWithHeight}) => (
            <MasonryGrid mediaList={item.content} />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="large" color="#444444" />
            ) : null
          }
        />
      </View>

      <Pressable
        onPress={albumAccessModal.openModal}
        className="bg-_white w-16 h-16 rounded-full absolute bottom-5 right-5 justify-center items-center">
        <CrossIcon
          style={{transform: [{rotate: '45deg'}]}}
          width={60}
          height={60}
          color="#444444"
        />
      </Pressable>
      {isSelectMode && (
        <Pressable
          onPress={mediaDeleteModal.openModal}
          className="bg-white w-full h-[72px] rounded-t-xl absolute bottom-0 justify-center items-center">
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
      <MediaDeleteModal
        visible={mediaDeleteModal.isVisible}
        onClose={mediaDeleteModal.closeModal}
      />
      <View className="justify-end">
        <Footer currentPage="home" navigation={navigation} />
      </View>
    </>
  );
}
