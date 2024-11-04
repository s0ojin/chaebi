import { View, Modal, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

type ModalCompProps = {
  showAuth: boolean
  setShowAuth: (value: boolean) => void
  showList: string[]
};

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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>옵션을 선택하세요</Text>
          {showList.map((element, index) => (
            <View key={index}>
              <Pressable
                style={[styles.option]}
                onPress={() => setShowAuth(false)}>
                <Text style={styles.textStyle}>{element}</Text>
              </Pressable>
              {index < showList.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 28,
    fontFamily: '이서윤체',
    textAlign: 'center',
    fontSize: 16,
  },
  option: {
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    fontFamily: '이서윤체',
    fontSize: 18,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'stretch',
    marginVertical: 5,
  },
});

export default ModalComp;