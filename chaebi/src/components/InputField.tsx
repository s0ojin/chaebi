import {View, TextInput, TextInputProps} from 'react-native';
import React from 'react';

interface InputFieldCompProps {
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  disabled?: boolean;
  isPhoneNum?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export default function InputFieldComp({
  placeholder,
  keyboardType = 'default',
  disabled = false,
  isPhoneNum = false,
  value,
  onChangeText,
}: InputFieldCompProps) {
  const handleTextChange = (text: string) => {
    if (isPhoneNum) {
      // 숫자만 남기기
      let cleaned = text.replace(/\D/g, '');

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
    <View className="bg-gray-200 rounded-lg py-2">
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        editable={!disabled}
        value={value}
        onChangeText={handleTextChange}
        className={`font-['이서윤체'] text-2xl px-4 ${
          disabled ? 'text-[#888888]' : 'text-black'
        }`}
      />
    </View>
  );
}
