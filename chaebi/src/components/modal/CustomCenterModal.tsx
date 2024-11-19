import React from 'react';
import {Modal, View, Pressable} from 'react-native';

interface CenterModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function CenterModal({visible, onClose, children}: CenterModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center">
        <Pressable
          onPress={onClose}
          className="absolute bg-black/50 top-0 right-0 left-0 bottom-0"
        />
        <View className="bg-white rounded-xl items-center shadow-lg">
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

export default CenterModal;
