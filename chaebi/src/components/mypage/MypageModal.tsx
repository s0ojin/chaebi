// WarningModal.tsx
import {View, Modal, TouchableOpacity} from 'react-native';
import Text from '../CustomText';
import React from 'react';
import { LOGOUT_WARNING, RESIGN_WARNING } from '../../constants/mypage';

interface WarningModalProps { 
  isWarn: boolean;
  visible: boolean;
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({
  isWarn,
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)]">
        {isWarn?(
          <View className="bg-white rounded-xl p-5 w-3/4">
            <Text className="text-2xl text-_red text-center">
              경고
            </Text>
            <Text className="text-lg text-center">
              {RESIGN_WARNING}
            </Text>
            <View className="h-px bg-[#E0E0E0] my-3" />
            <View className="flex-row w-full gap-2">
              <TouchableOpacity
                onPress={() => {
                  onClose();
                }}
                className="flex-1 bg-_red p-4 rounded-lg">
                <Text className="text-white text-center">
                  탈퇴하기
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 bg-primary-200 p-4 rounded-lg">
                <Text className="text-primary-400 text-center">
                  취소
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          ):(
            <View className="bg-white rounded-xl p-5 w-3/4">
            <Text className="text-lg text-center">
              {LOGOUT_WARNING}
            </Text>
            <View className="h-px bg-[#E0E0E0] my-3" />
            <View className="flex-row w-full gap-2">
              <TouchableOpacity
                onPress={() => {
                  onClose();
                }}
                className="flex-1 bg-primary-400 p-4 rounded-lg">
                <Text className="text-white text-center">
                  계속
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 bg-primary-200 p-4 rounded-lg">
                <Text className="text-primary-400 text-center">
                  취소
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          )}
        
      </View>
    </Modal>
  );
};

export default WarningModal;
