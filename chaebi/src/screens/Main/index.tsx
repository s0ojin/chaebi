import {View, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Logo from '../../assets/logo/logo.svg';
import ArrowRight from '../../assets/icon/arrow-right.svg';
import Footer from '../../components/Footer';
import LightPlus from '../../assets/icon/light-plus.svg';
import RemainListView from '../../components/RecipientCard';
import {Message} from '../Remain';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

interface MainScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function MainScreen({navigation}: MainScreenProps) {
  const [leaveData, setLeaveData] = useState<Message | null>(null);
  const [fillData, setFillData] = useState<any[]>([]);

  useEffect(() => {
    setLeaveData({
      id: 1,
      content: '잘가시게',
      userId: 1,
      recipient: {
        id: 1,
        name: '박수진',
        phone: '010-1111-1111',
        imgUrl: '',
      },
      lastModifiedDate: '2024-11-05T18:03:01.519939',
      sort: "center",
    });

    const images = [
      require('../../assets/dummy/test_image1.jpg'),
      require('../../assets/dummy/test_image2.jpg'),
      require('../../assets/dummy/test_image5.jpg'),
      require('../../assets/dummy/test_image6.jpg'),
    ];
    setFillData(images);
  }, []);

  const renderImageItem = ({item}: {item: any}) => (
    <Image
      source={item}
      resizeMode="cover"
      className="w-[49%] h-52 mb-2 rounded-lg"
    />
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center mb-4">
        <Logo width={56} height={42} />
      </View>

      <View className="flex-1 gap-6">
        {/* 추가 콘텐츠 */}
        <View className="bg-[#BAC3D0] rounded-2xl justify-center p-6">
          <Text className="text-3xl font-leeseoyoon">
            법적 효력이 있는 유언장?
          </Text>
          <Text className="text-gray-600 mt-2">
            법적 효력있는 유언장 작성하는 법 알아보기
          </Text>
          <View className="absolute bottom-3 right-3 bg-[#8E9299] rounded-full py-1 px-3">
            <Text className="text-white">1/1</Text>
          </View>
        </View>

        {/* 남기기 */}
        <View className="gap-3">
          <View className="h-16 flex-row justify-between items-center">
            <Text className="text-xl font-semibold">남기기</Text>
            <ArrowRight width={20} height={20} />
          </View>
          {leaveData ? (
            <RemainListView recipient={leaveData.recipient} isSetting={false} />
          ) : (
            <View className="flex-row w-full h-24 bg-[#F4F4F4] rounded-xl items-center justify-center">
              <LightPlus width={40} height={40} />
            </View>
          )}
        </View>

        {/* 채우기 */}
        <View className="gap-3">
          <View className="h-16 flex-row justify-between items-center">
            <Text className="text-xl font-semibold">채우기</Text>
            <ArrowRight width={20} height={20} />
          </View>
          {fillData.length > 0 ? (
            <FlatList
              data={fillData}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />
          ) : (
            <View className="flex-row w-1/2 h-52 bg-_white rounded-xl items-center justify-center">
              <LightPlus width={40} height={40} />
            </View>
          )}
        </View>
      </View>

      <View className="justify-end">
        <Footer currentPage="home" navigation={navigation} />
      </View>
    </View>
  );
}
