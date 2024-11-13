// WarningModal.tsx
import {View, Modal, TouchableOpacity, Pressable} from 'react-native';
import Text from '../CustomText';
import React from 'react';

interface WarningModalProps {
  isWarn: boolean;
  visible: boolean;
  content: string;
  msg: string;
  onClose: () => void;
  toDo: () => void;
}

const MypageModal: React.FC<WarningModalProps> = ({
  isWarn,
  visible,
  content,
  msg,
  onClose,
  toDo,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable
        className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)]"
        onPress={onClose}>
        {isWarn ? (
          <View className="bg-white rounded-xl p-5 w-3/4">
            <Text className="text-3xl text-_red text-center mb-2">경고</Text>
            <Text className="text-lg text-center leading-6">{content}</Text>
            <View className="h-px bg-[#E0E0E0] my-3" />
            <View className="flex-row w-full gap-2">
              <TouchableOpacity
                onPress={() => {
                  toDo();
                  onClose();
                }}
                className="flex-1 bg-_red p-2 rounded-lg">
                <Text className="text-white text-center text-lg">{msg}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 bg-primary-200 p-2 rounded-lg">
                <Text className="text-primary-400 text-center text-lg">
                  취소
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="bg-white rounded-xl p-5 w-80">
            <Text className="text-lg text-center">{content}</Text>
            <View className="h-px bg-[#E0E0E0] my-3" />
            <View className="flex-row w-full gap-2">
              <TouchableOpacity
                onPress={() => {
                  toDo();
                  onClose();
                }}
                className="flex-1 bg-primary-400 p-2 rounded-lg">
                <Text className="text-white text-center text-lg">로그아웃</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 bg-primary-200 p-2 rounded-lg">
                <Text className="text-primary-400 text-center text-lg">
                  취소
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};

export default MypageModal;
