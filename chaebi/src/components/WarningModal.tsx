// WarningModal.tsx
import {View, Modal, TouchableOpacity} from 'react-native';
import Text from '../components/CustomText';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {ABSENCE_WARNING} from '../constants/absence';

interface WarningModalProps {
  visible: boolean;
  onClose: () => void;
  navigation: StackNavigationProp<RootStackParamList>;
}

const WarningModal: React.FC<WarningModalProps> = ({
  visible,
  onClose,
  navigation,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)]">
        <View className="bg-white rounded-xl p-5 w-3/4">
          <Text className="text-2xl text-[#E10000] text-center">
            경고
          </Text>
          <Text className="text-lg text-center">
            {ABSENCE_WARNING}
          </Text>
          <View className="h-px bg-[#E0E0E0] my-3" />
          <View className="flex-row w-full gap-2">
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate('SendCode');
              }}
              className="flex-1 bg-[#444444] p-4 rounded-lg">
              <Text className="text-white text-center">
                계속
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-[#D9D9D9] p-4 rounded-lg">
              <Text className="text-[#444444] text-center">
                취소
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WarningModal;
