import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import Text from '../../components/CustomText';
import Header from '../../components/Header';
import SettingItem from '../../components/mypage/MypageItem';
import AlertIcon from '../../assets/icon/alert.svg';
import LockIcon from '../../assets/icon/lock.svg';
import FontIcon from '../../assets/icon/font.svg';
import LogoutIcon from '../../assets/icon/logout.svg';
import QuitIcon from '../../assets/icon/quit.svg';
import SupportIcon from '../../assets/icon/support.svg';
import WrenchIcon from '../../assets/icon/wrench.svg';
import Footer from '../../components/Footer';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from '../../components/mypage/MypageModal';
import {LOGOUT_WARNING, RESIGN_WARNING} from '../../constants/mypage';
import {deleteResignUser} from '../../api/mypage';
import {RootStackParamList} from '../../types/navigator';
import {Linking} from 'react-native';

interface SettingScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function MypageScreen({navigation}: SettingScreenProps) {
  const [modalVisiable, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isWarn, setIsWarn] = useState<boolean>(false);
  const [action, setAction] = useState<() => void>(() => {});

  const handleSupportPress = () => {
    const email = 'onepst@hanyang.ac.kr';
    const subject = '채비 어플 문의드립니다.';
    const body = '문의하실 내용을 자유롭게 작성해주세요!';

    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(emailUrl)
      .then(supported => {
        if (supported) {
          Linking.openURL(emailUrl);
        } else {
          Alert.alert('이메일 앱을 열 수 없습니다.');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <View className="flex-1 bg-primary-100">
      <Modal
        msg={message}
        content={content}
        isWarn={isWarn}
        visible={modalVisiable}
        onClose={() => {
          setModalVisible(false);
        }}
        toDo={action}></Modal>
      <Header pageName="설정" />
      {/* 설정 리스트뷰 */}
      <View className="flex-1 mt-4 gap-9">
        <View className="gap-5">
          <View className="mb-2">
            <SettingItem
              icon={<AlertIcon />}
              title="푸시알림 설정"
              onPress={() => {
                navigation.navigate('SetAlert');
              }}
            />
            <SettingItem
              icon={<LockIcon />}
              title="화면 잠금"
              onPress={() => {
                navigation.navigate('SetLock');
              }}
            />
            <SettingItem
              icon={<FontIcon />}
              title="글씨 스타일"
              disabled={true}
            />
          </View>
          <View className="my-2">
            <SettingItem
              icon={<LogoutIcon />}
              title="로그아웃"
              onPress={() => {
                setIsWarn(false);
                setContent(LOGOUT_WARNING);
                setMessage('로그아웃');
                setAction(() => () => {
                  AsyncStorage.removeItem('accessToken');
                  AsyncStorage.removeItem('refreshToken');
                  AsyncStorage.removeItem('bioType');
                  AsyncStorage.removeItem('password');
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'AppIntro'}],
                  });
                });
                setModalVisible(true);
              }}
            />
            <SettingItem
              icon={<QuitIcon />}
              title="탈퇴하기"
              onPress={() => {
                setIsWarn(true);
                setContent(RESIGN_WARNING);
                setMessage('탈퇴하기');
                setAction(() => () => {
                  deleteResignUser();
                  AsyncStorage.removeItem('bioType');
                  AsyncStorage.removeItem('password');
                  AsyncStorage.removeItem('accessToken');
                  AsyncStorage.removeItem('refreshToken');
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'AppIntro'}],
                  });
                });
                setModalVisible(true);
              }}
            />
          </View>
          <View className="my-2">
            <SettingItem
              icon={<SupportIcon />}
              title="문의하기"
              onPress={handleSupportPress}
            />
            <SettingItem
              icon={<WrenchIcon />}
              title="버전 정보"
              content={<Text className="p-4">v 1.0.0</Text>}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      <View className="bg-white">
        <Footer navigation={navigation} currentPage="mypage" />
      </View>
    </View>
  );
}
