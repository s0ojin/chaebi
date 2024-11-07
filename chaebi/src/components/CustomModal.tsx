import {View, Modal, Text, Pressable} from 'react-native';
import React from 'react';

export interface ModalElement {
  title: string;
  moveTo: ()=>void;
}

interface ModalCompProps {
  showAuth: boolean;
  setShowAuth: (value: boolean) => void;
  showList: ModalElement[];
}

const ModalComp: React.FC<ModalCompProps> = ({
  showAuth,
  setShowAuth,
  showList,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showAuth}
      onRequestClose={() => {
        setShowAuth(!showAuth);
      }}>
      <Pressable
        className="flex-1 bg-[rgba(0,0,0,0.7)] justify-center items-center"
        onPress={()=>setShowAuth(false)}>
        <View className="m-5 bg-white rounded-2xl p-9 shadow-lg items-center">
          {showList.map((element, index) => (
            <View key={index}>
              <Pressable
                className="rounded-2xl py-2 px-4"
                onPress={() => {
                  element.moveTo(), setShowAuth(false);
                }}>
                <Text className="font-[이서윤체] text-xl text-center">
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
    </Modal>
  );
};

export default ModalComp;
