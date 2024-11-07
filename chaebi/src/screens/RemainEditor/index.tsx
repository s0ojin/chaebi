import React, {useEffect, useRef} from 'react';
import HeaderComp from '../../components/HeaderComp';
import {TextInput as TextInputType, View} from 'react-native';
import Text from '../../components/CustomText';
import SettingIcon from '../../assets/icon/settings-alt.svg';
import TextInput from '../../components/CustomTextInput';
import EditorInputAccessory from '../../components/EditorInputAccessory';
import useEditorStore from '../../stores/editorStore';

export default function RemainEditorScreen() {
  const {align, text, setText} = useEditorStore();
  const textInputRef = useRef<TextInputType>(null);

  useEffect(() => {
    useEditorStore.setState({
      blurTextInput: () => textInputRef.current?.blur(),
    });
  }, []);

  return (
    <>
      <HeaderComp pageName="" />
      <View className="flex flex-row items-center justify-between w-full h-20 border-y border-primary-400 border-dashed px-5">
        <View className="flex flex-row items-center gap-4 my-auto">
          <View className="w-12 h-12 rounded-full bg-primary-200" />
          <View>
            <Text className="text-xl">박수진</Text>
            <Text className="text-sm">010-3475-6626</Text>
          </View>
        </View>
        <SettingIcon />
      </View>
      <TextInput
        ref={textInputRef}
        placeholder={`남길 말을 자유롭게 작성해보세요!
ex) 내 옷장아래 매일 오만원씩 적립하는중`}
        value={text}
        onChangeText={newText => setText(newText)}
        multiline={true}
        textAlignVertical="top"
        textAlign={align}
        className="flex-1 bg-transparent p-5 mt-5 text-xl"
      />
      <EditorInputAccessory />
    </>
  );
}
