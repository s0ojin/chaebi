import {View, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Logo from '../../assets/logo/logo.svg';
import RoundButton from '../../components/RoundButton';
import {INFO_TEXT} from '../../constants/sendcode';

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
              className="text-center text-2xl font-leeseoyoon">
              {index === 0
                ? INFO_TEXT[0]
                : index === 1
                ? INFO_TEXT[1]
                : index === 2
                ? INFO_TEXT[2]
                : INFO_TEXT[3]}
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
          <RoundButton content="코드 전송하기" onPress={() => {}} />
        </Animated.View>
      </View>
    </View>
  );
};

export default SendCodeScreen;