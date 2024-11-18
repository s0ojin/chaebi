import React, {Fragment} from 'react';
import CenterModal from './CustomCenterModal';
import {RECIPIENT_SETTING} from '../../constants/remain';
import {Pressable, View} from 'react-native';
import Text from '../CustomText';
import {RecipientSettingOptions} from '../../types/remain';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigator';
import {Recipient} from '../../screens/Remain';

interface RecipientSettingModalProps {
  visible: boolean;
  onClose: () => void;
  recipient: Recipient;
  recipientDeleteModalOpen: () => void;
}

export default function RecipientSettingModal({
  recipientDeleteModalOpen,
  onClose,
  visible,
  recipient,
}: RecipientSettingModalProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleOptionPress = (option: RecipientSettingOptions) => {
    switch (option) {
      case 'EDIT':
        navigation.navigate('RemainWrite', recipient);
        break;
      case 'DELETE':
        recipientDeleteModalOpen();
        break;
    }
  };

  return (
    <CenterModal onClose={onClose} visible={visible}>
      <View className="items-center px-5 py-2">
        {RECIPIENT_SETTING.map((option, idx) => (
          <Fragment key={option.key}>
            <Pressable
              onPress={() => {
                onClose();
                handleOptionPress(option.key);
              }}>
              <Text className="text-xl p-4 text-_black">{option.label}</Text>
            </Pressable>
            {idx !== RECIPIENT_SETTING.length - 1 && (
              <View className="h-[0.5px] w-full bg-primary-200" />
            )}
          </Fragment>
        ))}
      </View>
    </CenterModal>
  );
}
