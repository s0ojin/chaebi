import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
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
import {RootStackParamList} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from '../../components/mypage/MypageModal';
import {LOGOUT_WARNING, RESIGN_WARNING} from '../../constants/mypage';
import {deleteResignUser} from '../../api/mypage';

interface SettingScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function MypageScreen({navigation}: SettingScreenProps) {
  const [modalVisiable, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isWarn, setIsWarn] = useState<boolean>(false);
  const [action, setAction] = useState<() => void>(() => {});

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
            <SettingItem icon={<AlertIcon />} title="푸시알림 설정" onPress={()=>{navigation.navigate('SetAlert')}}/>
            <SettingItem icon={<LockIcon />} title="화면 잠금" onPress={()=>{navigation.navigate('SetLock')}}/>
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
                  AsyncStorage.setItem('token', '');
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'AppIntro' }],
                  });
                });
                setModalVisible(true);
              }}
              
            />
            <SettingItem
              icon={<QuitIcon />}
              title="탈퇴하기"
              onPress={() => {
                // 모달
                setIsWarn(true);
                setContent(RESIGN_WARNING);
                setMessage('탈퇴하기')
                setAction(() => () => {
                  deleteResignUser();
                  AsyncStorage.setItem('token', '');
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'AppIntro' }],
                  });
                });
                setModalVisible(true);
              }}
            />
          </View>
          <View className="my-2">
            <SettingItem icon={<SupportIcon />} title="문의하기" onPress={()=>{}}/>
            <SettingItem
              icon={<WrenchIcon />}
              title="버전 정보"
              content={<Text className="p-4">v 1.0.0</Text>}
              onPress={()=>{}}
            />
          </View>
        </View>
      </View>
      <View className="p-4 bg-white">
        <Footer navigation={navigation} currentPage="mypage"></Footer>
      </View>
    </View>
  );
}
