import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import HeaderComp from '../../components/HeaderComp';
import ModalComp from '../../components/ModalComp';
import Plus from '../../assets/icon/plus.svg';
import { NativeStackNavigationProp, } from '@react-navigation/native-stack';

const RemainScreen = function () {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <View style={styles.container}>
      <ModalComp
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        showList={[
          {title:'연락처에서 받아오기', moveTo: ()=>{}},
          {title: '직접 입력하기', moveTo:()=>{}}]}
      />
      <HeaderComp pageName={'남기기'} />
      <View style={{marginTop: 32, gap: 36}}>
        <View style={{paddingHorizontal: 24, gap: 20}}>
          <Text style={[styles.Text, {fontSize: 24}]}>
            아직 추가된 열람인이 없습니다!
          </Text>
          <Text style={[styles.Text, {fontSize: 20}]}>
            열람인은 내가 떠나고 난 뒤, {'\n'}
            기록을 전달받을 사람입니다. {'\n'}
            {'\n'}
            버튼을 눌러 열람인을 지정해보세요!
          </Text>
          <TouchableOpacity
            style={styles.RoundCircleButton}
            onPress={() => setShowAuth(true)}>
            <Plus style={styles.Plus} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  Text: {
    fontFamily: '이서윤체',
    textAlign: 'center',
  },
  RoundCircleButton: {
    top: 20,
    margin: 'auto',
    backgroundColor: '#808080',
    fontSize: 30,
    borderRadius: '100%',
    width: 100,
    height: 100,
  },
  Plus: {
    margin: 'auto',
  },
});

export default RemainScreen;
