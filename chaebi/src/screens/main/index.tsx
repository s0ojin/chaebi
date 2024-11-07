import {View, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Logo from '../../assets/logo/logo.svg';
import ArrowRight from '../../assets/icon/arrow-right.svg';
import FooterComp from '../../components/Footer';
import LightPlus from '../../assets/icon/light-plus.svg';
import RemainListViewComp from '../../components/RecipientCard';
import {Message} from '../Remain';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

interface MainScreenProps {
  navigation: StackNavigationProp<RootStackParamList>
}

export default function MainScreen({navigation} : MainScreenProps) {
  const [leaveData, setLeaveData] = useState<Message | null>(null);
  const [fillData, setFillData] = useState<any[]>([]);

  useEffect(() => {
    setLeaveData({
      id: 1,
      title: '잘가시게',
      userId: 1,
      recipient: {
        id: 1,
        name: '박수진',
        phone: '010-1111-1111',
        imgUrl: '',
      },
      lastModifiedDate: '2024-11-05T18:03:01.519939',
      sort: true,
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
      className="w-[48%] h-52 mb-2 rounded-lg"
    />
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center mb-4">
        <Logo width={56} height={42} />
      </View>

      <View className="flex-1 gap-6">
        {/* 추가 콘텐츠 */}
        <View>
          <Text className="text-xl font-semibold">추가 콘텐츠</Text>
          <Text className="text-gray-600 mt-2">
            여기에 더 많은 설명을 추가하세요.
          </Text>
        </View>

        {/* 남기기 */}
        <View className="gap-3">
          <View className="h-16 flex-row justify-between items-center">
            <Text className="text-xl font-semibold">남기기</Text>
            <ArrowRight width={20} height={20} />
          </View>
          {leaveData ? (
            // <View className="flex-row w-full bg-[#F4F4F4] px-4 py-2 h-24 rounded-xl gap-4">
            //   <View className="bg-[#D9D9D9] rounded-full w-11 h-11 justify-center" />
            //   <View className="flex-1 justify-center items-end">
            //     <Text>{leaveData.name}</Text>
            //     <Text>{leaveData.phone}</Text>
            //   </View>
            //   <View className="flex-1 justify-end">
            //     <Text>{leaveData.imgUrl}</Text>
            //   </View>
            // </View>
            <RemainListViewComp message={leaveData} isSetting={false} />
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
            <View className="flex-row w-1/2 h-52 bg-[#F4F4F4] rounded-xl items-center justify-center">
              <LightPlus width={40} height={40} />
            </View>
          )}
        </View>
      </View>

      <View className="justify-end">
        <FooterComp currentPage='home' navigation={navigation}/>
      </View>
    </View>
  );
}