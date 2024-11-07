import {
  Button,
  PermissionsAndroid,
  Platform,
  View,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../components/CustomText';
import Contacts from 'react-native-contacts';
import {Contact} from 'react-native-contacts/type';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import User from '../../assets/icon/User.svg';
import HeaderComp from '../../components/Header';
import RoundButtonComp from '../../components/RoundButton';

// 공식문서에 작성된 연락처 권한 승인
// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//         title: 'Contacts',
//         message: 'This app would like to view your contacts.',
//         buttonPositive: 'Please accept bare mortal',
//     })
//         .then((res) => {
//             console.log('Permission: ', res);
//             Contacts.getAll()
//                 .then((contacts) => {
//                     // work with contacts
//                     console.log(contacts);
//                 })
//                 .catch((e) => {
//                     console.log(e);
//                 });
//         })
//         .catch((error) => {
//             console.error('Permission error: ', error);
//         });

type ContactScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RemainWrite'>;
};


// 연락처에서 원하는 번호 받아오기
export default function ContactScreen({navigation} : ContactScreenProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Android에서 권한 요청
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: '연락처 접근 권한 요청',
          message: '연락처에 접근하기 위해 권한이 필요합니다.',
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

  // 연락처 불러오기
  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        setContacts(contacts);
      })
      .catch(error => {
        console.error('연락처를 불러오는 중 오류 발생:', error);
      });
  };

  useEffect(() => {
    // 권한 요청 및 연락처 불러오기
    requestPermission();
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      loadContacts();
    }
  }, [permissionGranted]);

  return (
    <View className="bg-white flex-1">
      <HeaderComp pageName="열람인 등록하기" />
      <View className="flex-1 px-6 my-8 justify-between">
        <FlatList
          data={contacts}
          keyExtractor={item => item.recordID}
          renderItem={({item}) => (
            <Pressable
              className="flex-row h-24 px-8 my-2 bg-[#F4F4F4] rounded-2xl justify-between items-center"
              onPress={() => {navigation.navigate('RemainQuestion', {
                name: `${item.familyName.trim()}${item.givenName}`,
                phone: `${item.phoneNumbers[0]?.number}`,
              })}}>
              <View className="flex-row justify-left items-center">
                {/* 사용자 이미지 */}
                {item.hasThumbnail ? (
                <Image
                  src={item.thumbnailPath}
                  className="rounded-full w-12 h-12"
                />)
                : (<User className="bg-[#000] rounded-full w-12 h-12" />)}
                {/* 사용자 정보 */}
                <View className="ml-4 gap-0">
                  <Text className="text-xl">
                    {item.familyName}
                    {item.givenName}
                  </Text>
                  <Text className="text-base">
                    {item.phoneNumbers[0]?.number}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      {/* 버튼 필드 */}
      <View className="mt-4">
          <RoundButtonComp
            content="연락처 업데이트"
            onPress={() => {
              loadContacts
            }}
          />
        </View>
      </View>
    </View>
  );
}
