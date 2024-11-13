import {View, Text, Image, FlatList, ImageSourcePropType} from 'react-native';
import React, {useEffect, useState} from 'react';
import Logo from '../../assets/logo/logo.svg';
import ArrowRight from '../../assets/icon/arrow-right.svg';
import Footer from '../../components/Footer';
import LightPlus from '../../assets/icon/light-plus.svg';
import RemainListView from '../../components/RecipientCard';
import {Message} from '../Remain';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import BannerContent from '../../components/main/BannerContent';

interface MainScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function MainScreen({navigation}: MainScreenProps) {
  const [leaveData, setLeaveData] = useState<Message | null>(null);
  const [fillData, setFillData] = useState<ImageSourcePropType[]>([]);
  const [contentPage, setContentPage] = useState<number>(0);

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

    const images: ImageSourcePropType[] = [
      require('../../assets/dummy/test_image1.jpg'),
      require('../../assets/dummy/test_image2.jpg'),
      require('../../assets/dummy/test_image5.jpg'),
      require('../../assets/dummy/test_image6.jpg'),
    ];
    setFillData(images);

    setContentPage(0);
  }, []);

  const renderImageItem = ({item}: {item: ImageSourcePropType}) => (
    <Image
      source={item}
      resizeMode="cover"
      className="w-[49%] h-52 mb-2 rounded-lg"
    />
  );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center p-4">
        <Logo width={56} height={42} />
      </View>

      <View className="flex-1 px-4 gap-2">
        <BannerContent contentPage={contentPage} />

        {/* 남기기 */}
        <View className="gap-1">
          <View className="h-16 flex-row justify-between items-center">
            <Text className="text-xl font-semibold">남기기</Text>
            <ArrowRight
              width={20}
              height={20}
              onPress={() => navigation.navigate('Remain')}
            />
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
        <View className="gap-1">
          <View className="h-16 flex-row justify-between items-center">
            <Text className="text-xl font-semibold">채우기</Text>
            <ArrowRight
              width={20}
              height={20}
              onPress={() => navigation.navigate('Album')}
            />
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
            <View className="flex-row w-1/2 h-52 bg-white rounded-xl items-center justify-center">
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
