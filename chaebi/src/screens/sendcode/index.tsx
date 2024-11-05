import {View, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Logo from '../../assets/logo/logo.svg';
import RoundButtonComp from '../../components/RoundButtonComp';

const SendCodeScreen: React.FC = () => {
  const animations = useRef<Animated.Value[]>([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    const startAnimation = (index: number) => {
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    };

    animations.forEach((_, index) => {
      setTimeout(() => {
        startAnimation(index);
      }, index * 1000);
    });
  }, [animations]);

  return (
    <View className="flex-1 p-5 gap-16">
      <View className="flex-1 items-center justify-center gap-12">
        <Logo width={150} height={120} />
        <View className="gap-9">
          {animations.slice(0, 4).map((animation, index) => (
            <Animated.Text
              key={index}
              style={{
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
              className="text-center text-2xl font-['이서윤체']">
              {index === 0
                ? '안녕하세요.'
                : index === 1
                ? '삶을 기록하고, 기록자가 떠나면\n남은분들께 전달해 드리는\n채비입니다.'
                : index === 2
                ? '코드받기 버튼을 누르면\n생전에 고인이 등록해두셨던\n열람인 분들께 코드가 전송됩니다.\n'
                : '기록자가 떠나셨다면\n기록이 전달될 수 있게\n버튼을 눌러주세요.'}
            </Animated.Text>
          ))}
        </View>
      </View>
      <View className="w-full justify-end">
        <Animated.View
          className="w-full justify-end"
          style={{
            opacity: animations[4],
            transform: [
              {
                translateY: animations[4].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}>
          <RoundButtonComp content="코드 전송하기" onPress={() => {}} />
        </Animated.View>
      </View>
    </View>
  );
};

export default SendCodeScreen;
