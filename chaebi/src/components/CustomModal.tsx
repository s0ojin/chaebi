import {View, Modal as RNModal,  Pressable} from 'react-native';
import Text from './CustomText';
import React from 'react';

export interface ModalElement {
  title: string;
  moveTo: () => void;
}

interface ModalProps {
  showAuth: boolean;
  setShowAuth: (value: boolean) => void;
  showList: ModalElement[];
}

const Modal: React.FC<ModalProps> = ({showAuth, setShowAuth, showList}) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={showAuth}
      onRequestClose={() => {
        setShowAuth(!showAuth);
      }}>
      <Pressable
        className="flex-1 bg-[rgba(0,0,0,0.7)] justify-center items-center"
        onPress={() => setShowAuth(false)}>
        <View className="m-5 bg-white rounded-2xl p-9 shadow-lg items-center">
          {showList.map((element, index) => (
            <View key={index}>
              <Pressable
                className="rounded-2xl py-2 px-4"
                onPress={() => {
                  element.moveTo();
                  setShowAuth(false);
                }}>
                <Text className="text-xl text-center">
                  {element.title}
                </Text>
              </Pressable>
              {index < showList.length - 1 && (
                <View className="h-px bg-gray-900 my-1 w-full" />
              )}
            </View>
          ))}
        </View>
      </Pressable>
    </RNModal>
  );
};

export default Modal;
