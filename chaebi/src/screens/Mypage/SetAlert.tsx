import {Switch, View} from 'react-native';
import Text from '../../components/CustomText';
import React, {useState} from 'react';
import MypageModal from '../../components/mypage/MypageModal';
import {
  NOTIFICATION_ALERT_1,
  NOTIFICATION_ALERT_2,
  NOTIFICATION_WARNING,
} from '../../constants/mypage';
import Header from '../../components/Header';
import SettingItem from '../../components/mypage/MypageItem';
import AlertIcon from '../../assets/icon/alert.svg';

export default function SetAlertScreen() {
  const [canAlert, setCanAlert] = useState<boolean>(false);
  const [modalVisiable, setModalVisible] = useState<boolean>(false);

  return (
    <View className="flex-1 bg-primary-100">
      <MypageModal
        content={NOTIFICATION_WARNING}
        isWarn={true}
        msg="비활성화"
        visible={modalVisiable}
        onClose={() => {
          setModalVisible(false);
        }}
        toDo={()=>{setCanAlert(false)}}></MypageModal>
      <Header pageName="설정 - 푸시알림 설정" />
      {/* 설정 리스트뷰 */}
      <View className="flex-1 mt-4 gap-9">
        <View className="gap-5">
          <SettingItem
            icon={<AlertIcon />}
            title="장기미방문 알림"
            content={
              <Switch
                trackColor={{true: '#444444', false: '#D9D9D9'}}
                thumbColor={canAlert ? '#444444' : '#D9D9D9'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  if (canAlert) setModalVisible(true);
                  setCanAlert(true);
                }}
                value={canAlert}
              />
            }
          />
          <Text className="text-center text-xl">{NOTIFICATION_ALERT_1}</Text>
          <Text className="text-center text-xl stroke-current">
            {NOTIFICATION_ALERT_2}
          </Text>
        </View>
      </View>
    </View>
  );
}
