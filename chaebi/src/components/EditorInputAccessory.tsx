import React from 'react';
import {Pressable, View} from 'react-native';
import ClockIcon from '../assets/icon/clock.svg';
import SortLeftIcon from '../assets/icon/sort-left.svg';
import SortCenterIcon from '../assets/icon/sort-center.svg';
import CheckIcon from '../assets/icon/check.svg';
import useEditorStore from '../stores/editorStore';
import {useMutation} from '@tanstack/react-query';
import {Remain} from '../types/remain';
import {postSaveLetter} from '../api/remain';
import {useToast} from './ToastContext';

interface EditorInputAccessoryProps {
  recipientId: number;
}

export default function EditorInputAccessory({
  recipientId,
}: EditorInputAccessoryProps) {
  const {showToast} = useToast();
  const {text, align, setText, setAlign, blurTextInput} = useEditorStore();
  const textMutation = useMutation({
    mutationFn: (payload: Remain) => postSaveLetter(payload, recipientId),
    onSuccess: data => {
      showToast(data);
    },
  });

  const handleInsertCurrentTime = () => {
    const now = new Date();
    const formattedTime = `${now.getFullYear()}.${
      now.getMonth() + 1
    }.${now.getDate()} ${now.getHours() > 12 ? '오후' : '오전'}${
      now.getHours() % 12
    }:${now.getMinutes()}`;
    setText(text + ' ' + formattedTime);
  };

  const handleToggleAlignment = () => {
    setAlign(align === 'left' ? 'center' : 'left');
  };

  const handleSaveText = () => {
    const payload = {
      content: text,
      sort: align,
    };
    textMutation.mutate(payload);
    blurTextInput();
  };

  return (
    <View className="flex flex-row gap-5 px-5 h-11 items-center">
      <Pressable onPress={handleInsertCurrentTime}>
        <ClockIcon />
      </Pressable>
      <Pressable onPress={handleToggleAlignment}>
        {align === 'left' ? <SortCenterIcon /> : <SortLeftIcon />}
      </Pressable>
      <Pressable onPress={handleSaveText} className="ml-auto">
        <CheckIcon width={32} height={32} color="#444444" />
      </Pressable>
    </View>
  );
}
