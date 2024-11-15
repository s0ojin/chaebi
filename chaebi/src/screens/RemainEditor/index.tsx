import React, {useEffect, useRef} from 'react';
import ArrowLeftIcon from '../../assets/icon/arrow-left.svg';
import {TextInput as TextInputType, View} from 'react-native';
import Text from '../../components/CustomText';
import SettingIcon from '../../assets/icon/settings-alt.svg';
import TextInput from '../../components/CustomTextInput';
import EditorInputAccessory from '../../components/EditorInputAccessory';
import useEditorStore from '../../stores/editorStore';
import {Recipient} from '../Remain';
import {Route} from '@react-navigation/native';
import {getLetter} from '../../api/remain';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type RemainEditorScreenProps = {
  route: Route<string, Recipient>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function RemainEditorScreen({
  route,
  navigation,
}: RemainEditorScreenProps) {
  const recipient: Recipient = route.params;
  const {align, text, setText} = useEditorStore();
  const textInputRef = useRef<TextInputType>(null);

  useEffect(() => {
    getLetter(recipient.id ? recipient.id : 0).then(data => {
      setText(data.content);
      useEditorStore.setState({
        blurTextInput: () => textInputRef.current?.blur(),
      });
    });
  }, []);

  return (
    <>
      <View className="px-4 py-5 flex-row items-center">
        <ArrowLeftIcon
          width={24}
          height={24}
          onPress={() => navigation.push('Remain')}
        />
        <Text className="text-xl font-bold ml-2 -mb-0.5 font-notosans"></Text>
      </View>
      <View className="flex flex-row items-center justify-between w-full h-20 border-y border-primary-400 border-dashed px-5">
        <View className="flex flex-row items-center gap-4 my-auto">
          <View className="w-12 h-12 rounded-full bg-primary-200" />
          <View>
            <Text className="text-xl">{recipient.name}</Text>
            <Text className="text-sm">{recipient.phone}</Text>
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
      <EditorInputAccessory recipientId={recipient.id ? recipient.id : 0} />
    </>
  );
}
