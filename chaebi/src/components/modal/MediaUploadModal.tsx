import React from 'react';
import {Alert, Image, Pressable, View} from 'react-native';
import Text from '../CustomText';
import RecipientTagList from '../album/RecipientTagList';
import useAlbumStore from '../../stores/albumStore';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postUploadMediaList} from '../../api/album';
import {UploadMediaListReq} from '../../types/album';

interface MediaUploadModalProps {
  closeModal: () => void;
}

export default function MediaUploadModal({closeModal}: MediaUploadModalProps) {
  const queryClient = useQueryClient();
  const {
    selectedLocalMediaList,
    setSelectedLocalMediaList,
    setAllRecipients,
    selectedRecipientIdList,
  } = useAlbumStore();

  const mediaUploadMutation = useMutation({
    mutationFn: (payload: UploadMediaListReq) => postUploadMediaList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['mediaList', 'all']});
    },
    onError: err => console.log(err.message),
    onSettled: () => {
      setAllRecipients([]);
      setSelectedLocalMediaList([]);
      closeModal();
    },
  });

  const createPayload = async (): Promise<UploadMediaListReq> => {
    const files = [];
    const capturedTimes = [];
    const locations = [];

    const convertToDecimal = (
      coordinate: string,
      ref: string,
    ): number | null => {
      if (!coordinate || !ref) return null;
      const [degrees, minutes, seconds] = coordinate.split(',').map(coord => {
        const [num, denom] = coord.split('/').map(Number);
        return denom ? num / denom : num;
      });

      let decimal = degrees + minutes / 60 + seconds / 3600;
      if (ref === 'S' || ref === 'W') decimal = -decimal;
      return decimal;
    };

    for (const media of selectedLocalMediaList) {
      const latitude = convertToDecimal(
        media.exif.GPSLatitude,
        media.exif.GPSLatitudeRef,
      );
      const longitude = convertToDecimal(
        media.exif.GPSLongitude,
        media.exif.GPSLongitudeRef,
      );

      const location =
        latitude !== null && longitude !== null
          ? `${latitude},${longitude}`
          : null;

      capturedTimes.push(
        media.exif.DateTimeDigitized?.split(' ')[0] ||
          media.exif.DateTime?.split(' ')[0] ||
          null,
      );
      locations.push(location || null);

      files.push({
        uri: media.path,
        type: media.mime,
        name: `media_${Date.now()}.jpg`,
      });
    }

    return {
      files,
      data: {
        recipientIds: selectedRecipientIdList,
        location: locations,
        capturedTime: capturedTimes,
      },
    };
  };

  const handleUpload = async () => {
    if (selectedRecipientIdList.length === 0) {
      Alert.alert(
        '경고',
        '최소 한 명 이상의 수신자를 선택해야 사진을 업로드할 수 있습니다.',
        [{text: '확인'}],
      );
      return;
    }
    const payload = await createPayload();
    mediaUploadMutation.mutate(payload);
  };

  return (
    <View className="p-5 min-w-80 items-center max-w-[80%] overflow-hidden">
      <Text className="text-2xl text-primary-400 ml-1 mb-3 self-start">
        누구에게 남길까요?
      </Text>

      <RecipientTagList />

      <View className="relative w-32 h-32 flex-row my-8">
        <View
          className="absolute top-0 left-0 w-full h-full bg-primary-200 rounded-lg"
          style={{zIndex: -2, transform: [{rotate: '-8deg'}]}}
        />
        <View
          className="absolute top-1 left-1 w-full h-full bg-primary-200 rounded-lg"
          style={{zIndex: -1, transform: [{rotate: '6deg'}]}}
        />
        <Image
          source={{
            uri: selectedLocalMediaList[0]?.path,
          }}
          className="w-full h-full rounded-lg"
        />
        <Text className="mt-2 text-primary-400 text-lg self-end ml-3">
          {`(${selectedLocalMediaList.length}장)`}
        </Text>
      </View>

      <View className="flex-row gap-2 h-11">
        <Pressable
          onPress={() => {
            setAllRecipients([]);
            setSelectedLocalMediaList([]);
            closeModal();
          }}
          className="bg-primary-200 flex-1 rounded-lg justify-center">
          <Text className="text-base text-primary-400 text-center">취소</Text>
        </Pressable>
        <Pressable
          onPress={handleUpload}
          className="bg-primary-400 flex-1 rounded-lg justify-center">
          <Text className="text-base text-_white text-center">채우기</Text>
        </Pressable>
      </View>
    </View>
  );
}
