import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

export default function Text(props: TextProps) {
  return (
    <RNText {...props} style={[props.style, {fontFamily: '이서윤체'}]}>
      {props.children}
    </RNText>
  );
}
