import React, {useRef} from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
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
import {ShuffleArray} from '../utilities/ShuffleArray';
import AppHeader from '../components/AppHeader';

interface IProps {
  navigation: StackNavigationProp<MainUserTabParamList, 'MeditationScreen'>;
  route: RouteProp<MainUserTabParamList, 'MeditationScreen'>;
}

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Meditations = ShuffleArray([
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
    image: require('../assets/images/background5.jpg'),
    mandalaColor: Colors.DANGER,
  },
  {
    name: 'Inside the woods',
    image: require('../assets/images/background4.jpg'),
    mandalaColor: Colors.DANGER,
  },
  {
    name: 'Buddha prayer',
    image: require('../assets/images/background6.jpg'),
    mandalaColor: Colors.DANGER,
  },
]);

const MeditationScreen: React.FC<IProps> = ({navigation}) => {
  let scrollAnimatedValue = new Animated.Value(0);
  const swiper = useRef<ParallaxSwiper>(null);

  const getPageTransformStyle = () => {
    return {
      transform: [
        {
          rotate: scrollAnimatedValue.interpolate({
            inputRange: Meditations.map((_, index) => index * WIDTH),
            outputRange: Meditations.map((_, index) => `-${index * 60}deg`),
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  };

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

  const scrollToPage = (index: number) => {
    swiper.current?.scrollToIndex(index);
  };

  const navigateToSession = () => {
    navigation.dangerouslyGetParent().navigate('SessionScreen', {
      meditation: {
        background: require('../assets/images/background_main.jpg'),
        music: '',
        duration: 10000,
      },
    });
  };

  return (
    <View>
      <ParallaxSwiper
        ref={swiper}
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
                    onPress={() => scrollToPage(index - 1)}
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
                    onPress={() => scrollToPage(index + 1)}
                  />
                </View>
              </View>
            }
          />
        ))}
      </ParallaxSwiper>

      <View style={styles.headerContainer}>
        <AppHeader
          title="Meditation"
          description="Choose theme to start your contemplation"
        />
      </View>

      <View style={styles.mandalaContainer}>
        <Animated.View
          style={[styles.mandalaInsideContainer, getPageTransformStyle()]}>
          <TouchableOpacity onPress={navigateToSession}>
            <MandalaAnimatedLogo withAnimation />
          </TouchableOpacity>
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
    paddingTop: 60,
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
    top: 60,
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
  hiddenButton: {
    opacity: 0,
  },
});
