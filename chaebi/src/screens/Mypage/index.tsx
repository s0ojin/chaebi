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
import Modal from '../../components/WarningModal';

interface SettingScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function MypageScreen({navigation}: SettingScreenProps) {
  const [modalVisiable, setModalVisible] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);

  return (
    <View className="flex-1 bg-primary-100">
      <Modal
        navigation={navigation}
        visible={modalVisiable}
        onClose={() => {
          setModalVisible(false);
        }}></Modal>
      <Header pageName="설정" />
      {/* 설정 리스트뷰 */}
      <View className="flex-1 mt-4 gap-9">
        <View className="gap-5">
          <View className="mb-2">
            <SettingItem icon={<AlertIcon />} label="푸시알림 설정" />
            <SettingItem icon={<LockIcon />} label="화면 잠금" />
            <SettingItem
              icon={<FontIcon />}
              label="글씨 스타일"
              disabled={true}
            />
          </View>
          <View className="my-2">
            <SettingItem
              icon={<LogoutIcon />}
              label="로그아웃"
              onPress={() => {
                // 모달

                // 로그아웃
                if (isLogout) AsyncStorage.setItem('token', '');
              }}
            />
            <SettingItem icon={<QuitIcon />} label="탈퇴하기" onPress={()=>{
                // 모달
                setModalVisible(true)
            }}/>
          </View>
          <View className="my-2">
            <SettingItem icon={<SupportIcon />} label="문의하기" />
            <SettingItem
              icon={<WrenchIcon />}
              label="버전 정보"
              text="v 1.0.0"
            />
          </View>
        </View>
      </View>
      <View className="p-4">
        <Footer navigation={navigation} currentPage="mypage"></Footer>
      </View>
    </View>
  );
}
