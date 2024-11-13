import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../components/CustomText';
import {Recipient} from '.';
import {Route} from '@react-navigation/native';
import InputField from '../../components/InputField';
import Header from '../../components/Header';
import RoundButton from '../../components/RoundButton';
import InfoIcon from '../../assets/icon/information.svg';
import Modal from '../../components/CustomModal';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import { postRecipient, updateRecipient } from '../../api/recipient';

type QuestionScreenProps = {
  route: Route<string, Recipient>;
  navigation: StackNavigationProp<RootStackParamList, 'RemainQuestion'>;
};

// 질문을 작성하는 페이지
export default function QuestionScreen({
  route,
  navigation,
}: QuestionScreenProps) {
  const recipient: Recipient = route.params;
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [modalVisiable, setModalVisible] = useState<boolean>(false);
  // 다음으로 넘어가서 열람용 인증질문 등록하기
  const [showNext, setShowNext] = useState<boolean>(false);

  useEffect(() => {
    if (recipient.secretQuestion) {
      setQuestion(recipient.secretQuestion);
    }
    if (recipient.secretAnswer) {
      setAnswer(recipient.secretAnswer);
    }
  }, []);

  useEffect(() => {
    if (question !== '' && answer !== '') {
      setShowNext(true);
    } else {
      setShowNext(false);
    }
  }, [question, answer]);

  return (
    <View className="flex-1 bg-white">
      <Modal
        showAuth={modalVisiable}
        setShowAuth={setModalVisible}
        showList={[
          {
            title: '당신의 태명은?',
            moveTo: function () {
              setQuestion('당신의 태명은?');
            },
          },
          {
            title: '같은 반 담임선생님 성함은?',
            moveTo: function () {
              setQuestion('같은 반 담임선생님 성함은?');
            },
          },
          {
            title: '직접 입력하기',
            moveTo: function () {
              setQuestion('');
            },
          },
        ]}
      />
      <Header pageName="열람인 등록하기" />
      <View className="flex-1 px-6 my-8 justify-between">
        {/* 입력 필드 */}
        <View className="flex-col gap-4">
          {/* 이전에 입력한 수신인 정보 */}
          <View className="flex-row h-24 px-8 bg-[#F4F4F4] rounded-2xl justify-between items-center">
            <View className="flex-row justify-left items-center">
              {/* 사용자 이미지 */}
              <View className="bg-[#D9D9D9] rounded-full w-12 h-12" />
              {/* {recipient.imgUrl === null || recipient.imgUrl === '' ? (
                <View className="bg-[#000] rounded-full w-12 h-12" />
              ) : (
                <Image
                  source={{uri: recipient.imgUrl}}
                  className="rounded-full w-12 h-12"
                />
              )} */}
              {/* 사용자 정보 */}
              <View className="ml-4 gap-1">
                <Text className="text-xl">{recipient.name}</Text>
                <Text className="text-base">{recipient.phone}</Text>
              </View>
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-2xl px-1 my-2">열람용 인증 질문</Text>
            <Text className="text-md">
              <InfoIcon /> 열람인이 반드시 알만한 답변으로 구성해주세요
            </Text>
            <Text className="text-md">
              <InfoIcon /> 명확하게 정답이 있는 질문으로 만들어주세요
            </Text>
            <Text className="text-md">
              <InfoIcon /> 10자 이내로 답변할 수 있는 질문으로 만들어주세요
            </Text>
            <TouchableOpacity
              className="bg-gray-200 rounded-lg my-2 py-4"
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text className="text-center text-2xl px-4">
                질문을 선택하세요
              </Text>
            </TouchableOpacity>
            <InputField
              placeholder="질문을 입력하세요"
              keyboardType="default"
              isPhoneNum={false}
              value={question}
              onChangeText={setQuestion}
            />
          </View>
          <View className="gap-5">
            <Text className="text-2xl mt-5">답변</Text>
            <InputField
              placeholder="답변을 입력하세요"
              keyboardType="default"
              isPhoneNum={false}
              value={answer}
              onChangeText={setAnswer}
            />
          </View>
        </View>

        {/* 버튼 필드 */}
        <View className="mt-4">
          <RoundButton
            content="등록"
            onPress={() => {
              if(recipient.secretAnswer) {
                recipient.secretQuestion = question;
                recipient.secretAnswer = answer;
                updateRecipient(recipient)
                navigation.navigate('RemainComplete', recipient);
                return;
              }
              recipient.secretQuestion = question;
              recipient.secretAnswer = answer;
              postRecipient(recipient)
              navigation.navigate('RemainComplete', recipient);
            }}
            disabled={!showNext}
          />
        </View>
      </View>
    </View>
  );
}
