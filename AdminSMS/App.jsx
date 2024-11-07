// import {View, Text, Alert, PermissionsAndroid, Platform} from 'react-native';
// import React, {useEffect, useState, useRef} from 'react';
// import SmsListener from 'react-native-android-sms-listener';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [smsContent, setSmsContent] = useState(null);
//   const smsSubscription = useRef(null); // SMS 리스너를 useRef로 관리

//   // SMS 권한 요청 함수
//   const requestSMSPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
//           {
//             title: 'SMS Permission',
//             message: 'This app needs access to your SMS to receive messages.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true; // Android가 아닌 경우 권한을 이미 부여된 상태로 간주
//   };

//   useEffect(() => {
//     // SMS 리스너 시작
//     const startSMSListener = async () => {
//       const permissionGranted = await requestSMSPermission();
//       setHasPermission(permissionGranted);

//       if (permissionGranted) {
//         // 중복 리스너 방지
//         if (!smsSubscription.current) {
//           smsSubscription.current = SmsListener.addListener(message => {
//             try {
//               console.log('Received SMS:', message.body); // 콘솔에 수신된 SMS 출력
//               setSmsContent(message.body); // 화면에 SMS 내용 출력
//             } catch (error) {
//               console.error('Error processing SMS:', error);
//               Alert.alert(
//                 'Error',
//                 'An error occurred while processing the SMS.',
//               );
//             }
//           });
//         }
//       } else {
//         Alert.alert('Permission Denied', 'Cannot read SMS without permission.');
//       }
//     };

//     startSMSListener();

//     // 컴포넌트 언마운트 시 리스너 제거
//     return () => {
//       if (smsSubscription.current) {
//         smsSubscription.current.remove();
//       }
//     };
//   }, []);

//   return (
//     <View style={{padding: 20}}>
//       <Text>SMS Listener App</Text>
//       {hasPermission ? (
//         <Text>
//           {smsContent ? `Received SMS: ${smsContent}` : 'Waiting for SMS...'}
//         </Text>
//       ) : (
//         <Text>No permission to read SMS</Text>
//       )}
//     </View>
//   );
// }
// import { useEffect, useState } from 'react';
// import { View, Text, Alert } from 'react-native';
// import SmsListener from 'react-native-android-sms-listener'; // SmsListener import

// export default function App() {
//   const [smsContent, setSmsContent] = useState(null);

//   useEffect(() => {
//     // SMS 리스너 시작
//     const subscription = SmsListener.addListener((message) => {
//       try {
//         console.log('Received SMS:', message.body);  // 수신된 SMS 출력
//         setSmsContent(message.body);  // 화면에 SMS 내용 표시
//       } catch (error) {
//         console.error('Error processing SMS:', error);
//         Alert.alert('Error', 'An error occurred while processing the SMS.');
//       }
//     });

//     // 컴포넌트 언마운트 시 리스너 제거
//     return () => {
//       subscription.remove();  // 리스너 취소
//     };
//   }, []);

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>SMS Listener App</Text>
//       {smsContent ? (
//         <Text>Received SMS: {smsContent}</Text>
//       ) : (
//         <Text>Waiting for SMS...</Text>
//       )}
//     </View>
//   );
// }

import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

export default function App() {
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');
  const [smsContent, setSmsContent] = useState();

  useEffect(() => {
    const requestSmsPermission = async () => {
      try {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        );
        setReceiveSmsPermission(permission);
      } catch (err) {
        console.log(err);
      }
    };
    requestSmsPermission();
  }, []);

  useEffect(() => {
    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      const subscriber = SmsListener.addListener(async message => {
        setSmsContent(message);
        console.log(message);

        // message를 바로 postSms 함수에 전달
        const postSms = async message => {
          try {
            const response = await fetch(
              'https://k11a309.p.ssafy.io/api/sms/analyze',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  body: message.body,
                  originatingAddress: message.originatingAddress,
                  timestamp: message.timestamp,
                }),
              },
            );
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log('Fetching data successfully');
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        };

        // postSms 함수 호출
        postSms(message);
      });

      return () => {
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission]);

  return (
    <View style={{padding: 20}}>
      <Text>SMS Listener App</Text>
      {smsContent ? (
        <View>
          <Text>Received SMS address: {smsContent.originatingAddress}</Text>
          <Text>Received SMS body: {smsContent.body}</Text>
          <Text>Received SMS timestamp: {smsContent.timestamp}</Text>
        </View>
      ) : (
        <Text>Waiting for SMS...</Text>
      )}
    </View>
  );
}
