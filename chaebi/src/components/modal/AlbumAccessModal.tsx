import React, {Fragment} from 'react';
import {Alert, Pressable, View, Platform, Linking} from 'react-native';
import Text from '../CustomText';
import {ALBUM_ACCESS} from '../../constants/album';
import {AlbumAccessOptions} from '../../types/album';
import {
  requestMultiple,
  request,
  RESULTS,
  PERMISSIONS,
  check,
} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import useAlbumStore from '../../stores/albumStore';

interface AlbumAccessModalProps {
  closeModal: () => void;
  mediaUploadModalOpenModal: () => void;
}

export default function AlbumAccessModal({
  closeModal,
  mediaUploadModalOpenModal,
}: AlbumAccessModalProps) {
  const {setSelectedLocalMediaList} = useAlbumStore();

  const handleOptionPress = (option: AlbumAccessOptions) => {
    switch (option) {
      case 'ALBUM':
        requestAlbumPermissions();
        break;
      case 'CAMERA':
        requestCameraPermissions();
        break;
      case 'FILE':
        requestFilePermissions();
        break;
    }
  };

  const requestAlbumPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const statuses = await requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);

      if (
        statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.GRANTED &&
        statuses[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === RESULTS.GRANTED
      ) {
        openAlbum();
      } else if (
        statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.BLOCKED ||
        statuses[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === RESULTS.BLOCKED
      ) {
        showSettingsAlert();
      }
    } else {
      const status = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (status === RESULTS.GRANTED) {
        openAlbum();
      } else if (status === RESULTS.BLOCKED) {
        showSettingsAlert();
      }
    }
  };

  const requestCameraPermissions = async () => {
    const status = await check(PERMISSIONS.ANDROID.CAMERA);

    if (status === RESULTS.GRANTED) {
      openCamera();
    } else {
      const requestStatus = await request(PERMISSIONS.ANDROID.CAMERA);
      if (requestStatus === RESULTS.GRANTED) {
        openCamera();
      } else if (status === RESULTS.BLOCKED) {
        showSettingsAlert();
      }
    }
  };

  const requestFilePermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const statuses = await requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
        PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      ]);

      if (
        statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.GRANTED &&
        statuses[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === RESULTS.GRANTED
      ) {
        openFilePicker();
      } else if (
        statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.BLOCKED ||
        statuses[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === RESULTS.BLOCKED
      ) {
        showSettingsAlert();
      }
    } else {
      const status = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (status === RESULTS.GRANTED) {
        openFilePicker();
      } else if (status === RESULTS.BLOCKED) {
        showSettingsAlert();
      }
    }
  };

  const showSettingsAlert = () => {
    Alert.alert(
      '권한 필요',
      '권한이 필요합니다. 설정에서 권한을 허용해 주세요.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '설정으로 이동',
          onPress: () => Linking.openSettings(),
        },
      ],
    );
  };

  const openAlbum = async () => {
    try {
      const images = await ImagePicker.openPicker({
        mediaType: 'any',
        multiple: true,
        includeExif: true,
      });
      setSelectedLocalMediaList(images);
      mediaUploadModalOpenModal();
    } catch (error) {
      console.error('앨범 접근 에러:', error);
    }
  };

  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        includeExif: true,
      });
      setSelectedLocalMediaList([image]);
      mediaUploadModalOpenModal();
    } catch (error) {
      console.error('카메라 에러:', error);
    }
  };

  const openFilePicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
      });
      setSelectedLocalMediaList(result);
      mediaUploadModalOpenModal();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('파일 선택 취소');
      } else {
        console.error('파일 선택 에러:', err);
      }
    }
  };

  return (
    <View className="items-center px-5 py-2">
      {ALBUM_ACCESS.map((option, idx) => (
        <Fragment key={option.key}>
          <Pressable
            onPress={() => {
              closeModal();
              handleOptionPress(option.key);
            }}>
            <Text className="text-xl p-4 text-_black">{option.label}</Text>
          </Pressable>
          {idx !== ALBUM_ACCESS.length - 1 && (
            <View className="h-[0.5px] w-full bg-primary-200" />
          )}
        </Fragment>
      ))}
    </View>
  );
}
