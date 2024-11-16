import {Alert, PermissionsAndroid, Platform, Switch, View} from 'react-native';
import Text from '../../components/CustomText';
import React, {useEffect, useState} from 'react';
import MypageModal from '../../components/mypage/MypageModal';
import {LOCK_ALERT_1, LOCK_ALERT_2} from '../../constants/mypage';
import Header from '../../components/Header';
import SettingItem from '../../components/mypage/MypageItem';
import InfoIcon from '../../assets/icon/information.svg';
import PasswordIcon from '../../assets/icon/password.svg';
import ChangeIcon from '../../assets/icon/change.svg';
import FaceLockIcon from '../../assets/icon/face-security.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import ReactNativeBiometrics, {
  Biometrics,
  FaceID,
  TouchID,
} from 'react-native-biometrics';
import {useToast} from '../../components/ToastContext';

interface SetLockScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function SetLockScreen({navigation}: SetLockScreenProps) {
  const [usePassword, setUsePassword] = useState<boolean>(false);
  const [useBiodata, setUseBiodata] = useState<boolean>(false);
  // 생체인식정보 사용 가능 여부 저장
  const [canUseBiodata, setCanUseBiodata] = useState<string>('');
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const {showToast} = useToast();

  const rnBiometrics: ReactNativeBiometrics = new ReactNativeBiometrics();

  const checkAvailable: () => Promise<string> = async () => {
    try {
      const resultObject = await rnBiometrics.isSensorAvailable();
      if (
        resultObject.error &&
        resultObject.error === 'BIOMETRIC_ERROR_NONE_ENROLLED'
      ) {
        showToast('등록된 생체정보가 없어 비활성화 되었습니다.');
      }
      const {available, biometryType} = resultObject;
      if (available && biometryType === TouchID) {
        return TouchID.toString();
      } else if (available && biometryType === FaceID) {
        return FaceID.toString();
      } else if (available && biometryType === Biometrics) {
        return Biometrics.toString();
      }
      return '';
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  // 생체인식 권한 설정
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.USE_FINGERPRINT,
        {
          title: '지문 허용 요청',
          message: '지문을 통한 본인인증 권한이 필요합니다.',
          buttonPositive: '허용',
        },
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
      } else {
        console.log('연락처 접근 권한이 거부되었습니다.');
      }
    } else {
      // iOS는 권한을 자동으로 요청하므로 따로 권한 요청 코드를 작성하지 않아도 됩니다.
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('password').then(data => {
      if (data) setUsePassword(true);
    });

    AsyncStorage.getItem('bioType').then(data => {
      if (data) setUseBiodata(true);
    });

    requestPermission();

    checkAvailable().then(data => {
      setCanUseBiodata(data);
    });
  }, []);

  return (
    <View className="flex-1 bg-primary-100">
      <Header pageName="설정 - 화면잠금" />
      {/* 설정 리스트뷰 */}
      <View className="flex-1 mt-4 gap-9">
        <View className="gap-5">
          <View className="px-6">
            <View className="flex-row items-center">
              <InfoIcon />
              <Text className="text-xl ml-2">{LOCK_ALERT_1}</Text>
            </View>
            <View className="flex-row">
              <View className="mt-2">
                <InfoIcon />
              </View>
              <Text className="text-xl ml-2">{LOCK_ALERT_2}</Text>
            </View>
          </View>
          <View>
            <SettingItem
              icon={<PasswordIcon />}
              title="비밀번호 설정"
              content={
                <Switch
                  trackColor={{true: '#444444', false: '#D9D9D9'}}
                  thumbColor={usePassword ? '#444444' : '#D9D9D9'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    if (!usePassword) navigation.navigate('SetPw');
                    else if (usePassword) {
                      AsyncStorage.removeItem('password');
                    }
                    setUsePassword(!usePassword);
                  }}
                  value={usePassword}
                />
              }
              onPress={() => {}}
            />
            <SettingItem
              icon={<ChangeIcon />}
              disabled={!usePassword}
              title="비밀번호 변경"
              onPress={() => {
                navigation.navigate('SetPw');
              }}
            />
          </View>
          <SettingItem
            icon={<FaceLockIcon />}
            title="생체 인증"
            content={
              <Switch
                trackColor={{true: '#444444', false: '#D9D9D9'}}
                thumbColor={useBiodata ? '#444444' : '#D9D9D9'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  if (useBiodata) {
                    AsyncStorage.removeItem('bioType');
                    setUseBiodata(false);
                  } else if (!useBiodata && canUseBiodata) {
                    rnBiometrics
                      .simplePrompt({
                        promptMessage: '화면잠금을 위한 생체정보 확인',
                      })
                      .then(SimplePromptResult => {
                        if (canUseBiodata)
                          AsyncStorage.setItem('bioType', canUseBiodata);
                        setUseBiodata(SimplePromptResult.success);
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  }
                  // else showToast("생체인식을 이용할 수 없습니다.")
                }}
                value={useBiodata}
                disabled={!useBiodata && !canUseBiodata}
              />
            }
            onPress={() => {}}
            disabled={!useBiodata && !canUseBiodata}
          />
        </View>
      </View>
    </View>
  );
}
