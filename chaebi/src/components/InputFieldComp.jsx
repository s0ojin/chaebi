import {View, TextInput} from 'react-native';
import React from 'react';

export default function InputFieldComp({
  placeholder,
  keyboardType,
  disabled,
  isPhoneNum,
  value, // 추가된 props
  onChangeText, // 추가된 props
}) {
  const handleTextChange = text => {
    if (isPhoneNum) {
      // 숫자만 남기기
      let cleaned = ('' + text).replace(/\D/g, '');

      // 포맷팅: xxx-xxxx-xxxx 형식으로 설정
      if (cleaned.length >= 7) {
        cleaned =
          cleaned.slice(0, 3) +
          '-' +
          cleaned.slice(3, 7) +
          '-' +
          cleaned.slice(7, 11);
      } else if (cleaned.length >= 4) {
        cleaned = cleaned.slice(0, 3) + '-' + cleaned.slice(3);
      }

      onChangeText(cleaned); // 변경된 값을 상위 컴포넌트로 전달
    } else {
      onChangeText(text); // 변경된 값을 상위 컴포넌트로 전달
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: 12,
        paddingVertical: 10,
      }}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        editable={!disabled}
        value={value} // props로 받은 값 사용
        onChangeText={handleTextChange}
        style={{
          fontFamily: '이서윤체',
          fontSize: 24,
          padding: 16,
          color: disabled ? '#888888' : '#000000',
        }}
      />
    </View>
  );
}
