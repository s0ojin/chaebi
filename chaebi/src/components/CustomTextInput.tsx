import React, {ForwardedRef, forwardRef} from 'react';
import {TextInput as RNTextInput, TextInputProps} from 'react-native';

const TextInput = forwardRef(
  (props: TextInputProps, ref: ForwardedRef<RNTextInput>) => {
    return (
      <RNTextInput
        ref={ref}
        {...props}
        style={[props.style, {fontFamily: '이서윤체'}]}>
        {props.children}
      </RNTextInput>
    );
  },
);

export default TextInput;
