import React from 'react';
import {Pressable, View} from 'react-native';
import CenterModal from './CustomCenterModal';
import Text from '../CustomText';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteMedia} from '../../api/album';
import useAlbumStore from '../../stores/albumStore';

interface MediaDeleteModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function MediaDeleteModal({
  visible,
  onClose,
}: MediaDeleteModalProps) {
  const queryClient = useQueryClient();
  const {selectedAppMediaList, clearSelectedAppMediaList, setIsSelectMode} =
    useAlbumStore();
  const mediaDeleteMutation = useMutation({
    mutationFn: () => deleteMedia(selectedAppMediaList),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mediaList']});
    },
    onError: err => console.log(err.message),
    onSettled: () => {
      clearSelectedAppMediaList();
      setIsSelectMode();
      onClose();
    },
  });

  const handleDeleteMedia = () => {
    mediaDeleteMutation.mutate();
  };

  return (
    <CenterModal visible={visible} onClose={onClose}>
      <View className="px-6 py-4 min-w-80 items-center max-w-[80%] gap-3">
        <Text className="text-lg text-primary-400 text-center leading-5">
          {'정말 삭제할까요?\n삭제 후 복구할 수 없습니다.'}
        </Text>
        <View className="h-[0.5px] w-full bg-primary-200" />
        <View className="flex-row gap-2">
          <Pressable
            onPress={handleDeleteMedia}
            className="flex-1 h-10 bg-_red rounded-lg justify-center items-center">
            <Text className="text-_white">삭제</Text>
          </Pressable>
          <Pressable className="flex-1 h-10 bg-primary-200 rounded-lg justify-center items-center">
            <Text className="text-primary-400">취소</Text>
          </Pressable>
        </View>
      </View>
    </CenterModal>
  );
}
