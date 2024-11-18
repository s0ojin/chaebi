import {View, Text, Image, FlatList, ImageSourcePropType} from 'react-native';
import React from 'react';
import Logo from '../../assets/logo/logo.svg';
import ArrowRight from '../../assets/icon/arrow-right.svg';
import Footer from '../../components/Footer';
import LightPlus from '../../assets/icon/light-plus.svg';
import RemainListView from '../../components/RecipientCard';
import {StackNavigationProp} from '@react-navigation/stack';
import BannerContent from '../../components/main/BannerContent';
import {RootStackParamList} from '../../types/navigator';
import {useQuery} from '@tanstack/react-query';
import {getRecipientList} from '../../api/recipient';
import {getMediaList} from '../../api/album';

interface MainScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function MainScreen({navigation}: MainScreenProps) {
  const {data: recipientList} = useQuery({
    queryKey: ['recipientList'],
    queryFn: getRecipientList,
  });

  const {data: mediaList} = useQuery({
    queryKey: ['mediaList'],
    queryFn: () => getMediaList(0),
  });

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
        <BannerContent contentPage={0} />

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
          {recipientList ? (
            <RemainListView recipient={recipientList[0]} isSetting={false} />
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
          {mediaList && mediaList.content.length > 0 ? (
            <FlatList
              data={mediaList.content
                .slice(0, 4)
                .map(media => ({uri: media.fileUrl}))}
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
