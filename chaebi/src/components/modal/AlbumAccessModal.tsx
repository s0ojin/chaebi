import React from 'react';
import {Alert, Pressable, View, Platform, Linking} from 'react-native';
import Text from '../CustomText';
import {ALBUM_ACCESS} from '../../constants/album';
import {AlbumAccessOptions} from '../../types/album';
import {
  requestMultiple,
  request,
  RESULTS,
  PERMISSIONS,
} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';

export default function AlbumAccessModal() {
  const handleOptionPress = (option: AlbumAccessOptions) => {
    switch (option) {
      case 'ALBUM':
        requestAlbumPermissions();
        break;
      case 'CAMERA':
        // TODO 카메라 권한 요청 로직 추가
        break;
      case 'FILE':
        // TODO 파일 접근 권한 요청 로직 추가
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

  const showSettingsAlert = () => {
    Alert.alert(
      '권한 필요',
      '사진과 비디오에 접근하려면 권한이 필요합니다. 설정에서 권한을 허용해 주세요.',
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

  const openAlbum = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 10,
      },
      response => {
        if (response.didCancel) {
          console.log('앨범 접근 취소');
        } else if (response.errorMessage) {
          console.error('앨범 접근 에러', response.errorMessage);
        } else if (response.assets) {
          console.log('선택한 미디어:', response.assets);
        }
      },
    );
  };

  return (
    <View className="items-center px-5 py-2">
      {ALBUM_ACCESS.map((option, idx) => (
        <View key={option.key}>
          <Pressable onPress={() => handleOptionPress(option.key)}>
            <Text className="text-xl p-4 text-_black">{option.label}</Text>
          </Pressable>
          {idx !== ALBUM_ACCESS.length - 1 && (
            <View className="h-[0.5px] w-full bg-primary-200" />
          )}
        </View>
      ))}
    </View>
  );
}
