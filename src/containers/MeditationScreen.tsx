import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainUserTabParamList} from '../navigation/UserTabContainer';
import GlobalStyles from '../styles/GlobalStyles';

//@ts-ignore // Typescript non supported library // TO DO Add ts definitions
import {ParallaxSwiper, ParallaxSwiperPage} from 'react-native-parallax-swiper';
import Colors from '../styles/Colors';
import MandalaAnimatedLogo from '../components/MandalaAnimatedLogo';
import FunctionalIconButton from '../components/FunctionalIconButton';

interface IProps {
  navigation: StackNavigationProp<MainUserTabParamList, 'MeditationScreen'>;
  route: RouteProp<MainUserTabParamList, 'MeditationScreen'>;
}

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Meditations = [
  {
    name: 'Mountain night',
    image: require('../assets/images/background_main.jpg'),
    mandalaColor: Colors.WHITE,
  },
  {
    name: 'Achieve peaks',
    image: require('../assets/images/background2.jpg'),
    mandalaColor: Colors.PRIMARY,
  },
  {
    name: 'Gretting the sun',
    image: require('../assets/images/background3.jpg'),
    mandalaColor: Colors.DANGER,
  },
];

const MeditationScreen: React.FC<IProps> = ({}) => {
  let scrollAnimatedValue = new Animated.Value(0);

  const getPageTransformStyle = () => ({
    transform: [
      {
        rotate: scrollAnimatedValue.interpolate({
          inputRange: [0, WIDTH, WIDTH * 2],
          outputRange: ['60deg', '0deg', '-60deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  const getMeditationTitleStyle = (index: number) => {
    const startValue = WIDTH * index;
    const halfOfWidth = WIDTH / 2;
    return {
      opacity: scrollAnimatedValue.interpolate({
        inputRange: [
          startValue - halfOfWidth,
          startValue,
          startValue + halfOfWidth,
        ],
        outputRange: [0, 1, 0],
      }),
    };
  };

  return (
    <View>
      <ParallaxSwiper
        speed={0.7}
        animatedValue={scrollAnimatedValue}
        dividerWidth={1}
        dividerColor="black"
        backgroundColor="black">
        {Meditations.map((value, index) => (
          <ParallaxSwiperPage
            BackgroundComponent={
              <ImageBackground
                source={value.image}
                style={{width: WIDTH, height: HEIGHT}}>
                <View style={styles.imageDark} />
              </ImageBackground>
            }
            ForegroundComponent={
              <View style={styles.itemPage}>
                <View style={styles.itemTitle}>
                  <FunctionalIconButton
                    iconName="chevron-left"
                    size={35}
                    containerStyle={index === 0 && styles.hiddenButton}
                  />

                  <Animated.Text
                    style={[
                      GlobalStyles.logoText,
                      getMeditationTitleStyle(index),
                    ]}>
                    {value.name}
                  </Animated.Text>

                  <FunctionalIconButton
                    iconName="chevron-right"
                    size={35}
                    containerStyle={
                      Meditations.length - 1 === index && styles.hiddenButton
                    }
                  />
                </View>
              </View>
            }
          />
        ))}
      </ParallaxSwiper>

      <View style={styles.headerContainer}>
        <Text style={GlobalStyles.hugeText}>Meditation</Text>
        <Text style={[GlobalStyles.standardText, styles.descText]}>
          Choose theme to start your contemplation
        </Text>
      </View>

      <View style={styles.mandalaContainer}>
        <Animated.View
          style={[styles.mandalaInsideContainer, getPageTransformStyle()]}>
          <MandalaAnimatedLogo withAnimation />
        </Animated.View>
      </View>
    </View>
  );
};

export default MeditationScreen;

const styles = StyleSheet.create({
  imageDark: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
  },
  itemPage: {
    padding: 20,
    paddingTop: 80,
    flex: 1,
  },
  itemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 150,
    left: 50,
    right: 50,
    position: 'absolute',
  },
  headerContainer: {
    position: 'absolute',
    top: 80,
    right: 20,
    left: 20,
  },
  mandalaContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mandalaInsideContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  descText: {
    paddingVertical: 10,
  },
  hiddenButton: {
    opacity: 0,
  },
});
