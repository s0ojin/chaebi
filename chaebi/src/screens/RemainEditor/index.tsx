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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigator';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getSavedLetter, postSaveLetter} from '../../api/remain';
import {Remain} from '../../types/remain';

type RemainEditorScreenProps = {
  route: Route<string, Recipient>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function RemainEditorScreen({
  route,
  navigation,
}: RemainEditorScreenProps) {
  const recipient: Recipient = route.params;

  const {align, text, setText, setAlign} = useEditorStore();
  const textInputRef = useRef<TextInputType>(null);

  const {data: savedLetter} = useQuery({
    queryKey: ['savedLetter', recipient.id],
    queryFn: () => getSavedLetter(recipient.id),
  });

  const LetterSaveMutation = useMutation({
    mutationFn: (payload: Remain) => postSaveLetter(payload, recipient.id),
  });

  useEffect(() => {
    if (savedLetter?.content) {
      setText(savedLetter.content);
      setAlign(savedLetter.sort);
    }
  }, [savedLetter, setText, setAlign]);

  useEffect(() => {
    useEditorStore.setState({
      blurTextInput: () => textInputRef.current?.blur(),
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (text && text !== savedLetter?.content) {
        const payload = {
          content: text,
          sort: align,
        };
        LetterSaveMutation.mutate(payload);
      }
      setText('');
    });
    return unsubscribe;
  }, [navigation, text, savedLetter, LetterSaveMutation, setText, align]);

  return (
    <>
      <View className="px-4 py-5 flex-row items-center">
        <ArrowLeftIcon
          width={24}
          height={24}
          onPress={() => navigation.push('Remain')}
        />
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
