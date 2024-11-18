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

  // SMS 권한을 요청하는 함수
  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      );

      console.log('SMS Permission Status:', permission); // 권한 상태 출력

      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        setReceiveSmsPermission(permission);
      } else {
        console.log('SMS Permission denied');
        setReceiveSmsPermission(PermissionsAndroid.RESULTS.DENIED);
      }
    } catch (err) {
      console.log('Error requesting SMS permission:', err);
    }
  };

  useEffect(() => {
    requestSmsPermission();
  }, []);

  useEffect(() => {
    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      // SMS 리스너 설정
      const subscriber = SmsListener.addListener(async message => {
        console.log('SMS received:', message); // SMS가 수신될 때 로그 출력
        setSmsContent(message);

        // 서버에 SMS 내용 전송
        const postSms = async content => {
          try {
            const response = await fetch(
              'http://k11a309.p.ssafy.io:8080/api/sms/analyze',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  body: content.body,
                  originatingAddress: content.originatingAddress,
                  timestamp: content.timestamp,
                }),
              },
            );

            console.log('Response status:', response.status);
            const text = await response.text();
            console.log('Response text:', text);

            if (response.ok && text) {
              const data = JSON.parse(text); // JSON 변환
              console.log('Fetched data:', data);
            } else if (!text) {
              console.log('Empty response from server');
            } else {
              throw new Error('Failed to fetch data');
            }
          } catch (error) {
            console.log('Error posting SMS:', error);
          }
        };

        postSms(message);
      });

      // 컴포넌트가 언마운트되면 리스너를 제거
      return () => {
        subscriber.remove();
      };
    } else {
      console.log('SMS Permission not granted');
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
