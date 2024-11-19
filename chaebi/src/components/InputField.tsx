import {View, TextInput, TextInputProps} from 'react-native';
import React from 'react';

interface InputFieldProps {
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  disabled?: boolean;
  isPhoneNum?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export default function InputField({
  placeholder,
  keyboardType = 'default',
  disabled = false,
  isPhoneNum = false,
  value,
  onChangeText,
}: InputFieldProps) {
  const handleTextChange = (text: string) => {
    if (isPhoneNum) {
      // 숫자만 남기기
      let cleaned = text.replace(/\D/g, '');

      // 포맷팅: xxx-xxxx-xxxx 형식으로 설정
      let formattedValue = cleaned;
      if (cleaned.length >= 7) {
        formattedValue =
          cleaned.slice(0, 3) +
          '-' +
          cleaned.slice(3, 7) +
          '-' +
          cleaned.slice(7, 11);
      } else if (cleaned.length >= 4) {
        formattedValue = cleaned.slice(0, 3) + '-' + cleaned.slice(3);
      }

      onChangeText(cleaned); // '-'가 없는 값을 상위 컴포넌트로 전달
    } else {
      onChangeText(text); // 일반 텍스트인 경우 그대로 상위 컴포넌트로 전달
    }
  };

  // 포맷팅된 값을 별도로 계산하여 TextInput에 전달
  const formattedValue = isPhoneNum
    ? value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
          if (p3) return `${p1}-${p2}-${p3}`;
          else if (p2) return `${p1}-${p2}`;
          else return p1;
        })
    : value;

  return (
    <View className="bg-gray-200 rounded-lg py-2">
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        editable={!disabled}
        value={formattedValue} // 포맷팅된 값 사용
        onChangeText={handleTextChange}
        className={`font-leeseoyoon text-2xl px-4 ${
          disabled ? 'text-primary-300' : 'text-black'
        }`}
      />
    </View>
  );
}
