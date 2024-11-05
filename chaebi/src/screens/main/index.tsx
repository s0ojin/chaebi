import {View, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Logo from '../../assets/logo/logo.svg';
import ArrowRight from '../../assets/icon/arrow-right.svg';
import FooterComp from '../../components/FooterComp';
import LightPlus from '../../assets/icon/light-plus.svg';

type LeaveData = {
  name: string;
  phone: string;
  imgUrl: string;
};

export default function MainScreen() {
  const [leaveData, setLeaveData] = useState<LeaveData | null>(null);
  const [fillData, setFillData] = useState<string[] | null>(null);

  useEffect(() => {
    // 데이터 초기화 예시
    // setLeaveData({
    //   name: '박수진',
    //   phone: '010-3475-6626',
    //   imgUrl: 'https://via.placeholder.com/150',
    // });
    // setFillData(['https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100']);
  }, []);

  return (
    <View className="flex-1 p-5 bg-white">
      <View className="flex-row items-center mb-4">
        <Logo width={56} height={42} />
      </View>
      <View className="flex-1 gap-6">
        {/* Additional Content Section */}
        <View className="">
          <Text className="text-xl font-semibold">추가 콘텐츠</Text>
          <Text className="text-gray-600 mt-2">
            여기에 더 많은 설명을 추가하세요.
          </Text>
        </View>

        {/* Leave Data Section */}
        <View className="gap-3">
          <View className="h-16 flex-row justify-between items-center">
            <Text className="text-xl font-semibold">남기기</Text>
            <ArrowRight width={20} height={20} />
          </View>
          {leaveData ? (
            <View className="flex-row w-full bg-[#F4F4F4] px-4 py-2 h-24 rounded-xl gap-4">
              <View className="bg-[#D9D9D9] rounded-full w-11 h-11 justify-center" />
              <View className="flex-1 justify-center items-end">
                <Text>{leaveData.name}</Text>
                <Text>{leaveData.phone}</Text>
              </View>
              <View className="flex-1 justify-end">
                <Text>{leaveData.imgUrl}</Text>
              </View>
            </View>
          ) : (
            <View className="flex-row w-full bg-[#F4F4F4] h-24 rounded-xl items-center justify-center">
              <LightPlus width={40} height={40} />
            </View>
          )}
        </View>

        {/* Fill Data Section */}
        {/* Fill Data Section */}
        <View className="gap-3">
          <View className="h-16 flex-row justify-between items-center">
            <Text className="text-xl font-semibold">채우기</Text>
            <ArrowRight width={20} height={20} />
          </View>
          <FlatList
            data={fillData || [null, null]} // fillData가 없을 때 두 개의 빈 데이터를 추가하여 두 컬럼 유지
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) =>
              item ? (
                <View style={{flex: 1, margin: 4, alignItems: 'center'}}>
                  <Image
                    source={{uri: item}}
                    style={{width: 100, height: 100, borderRadius: 8}}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    margin: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F4F4F4',
                    height: 100,
                    borderRadius: 8,
                  }}>
                  <LightPlus width={40} height={40} />
                </View>
              )
            }
            numColumns={2} // 두 개의 컬럼으로 설정
          />
        </View>
      </View>
      <View className="justify-end">
        <FooterComp />
      </View>
    </View>
  );
}
