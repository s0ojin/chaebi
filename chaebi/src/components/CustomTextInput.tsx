import React from 'react';
import {TextInput as RNTextInput, TextInputProps} from 'react-native';

export default function TextInput(props: TextInputProps) {
  return (
    <RNTextInput {...props} style={[props.style, {fontFamily: '이서윤체'}]}>
      {props.children}
    </RNTextInput>
  );
}
