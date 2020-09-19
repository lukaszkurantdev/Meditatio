import React from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainContainer';

import Button, {ButtonType} from '../components/Button';
import MandalaAnimatedLogo from '../components/MandalaAnimatedLogo';

import FacebookLogo from '../assets/svg/FacebookLogo';
import GoogleLogo from '../assets/svg/GoogleLogo';

import GlobalStyles from '../styles/GlobalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, 'WelcomeScreen'>;
  route: RouteProp<RootStackParamList, 'WelcomeScreen'>;
}

export default class WelcomeScreen extends React.Component<IProps> {
  navigateToLoginScreen = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" />
        <Video
          source={require('../assets/videos/start_video.mp4')}
          style={styles.backgroundVideo}
          repeat
          paused={false}
          resizeMode="cover"
        />
        <View style={styles.container}>
          <View style={[styles.partContainer]}>
            <MandalaAnimatedLogo />
            <Text style={[GlobalStyles.logoText, styles.logoText]}>
              meditatio
            </Text>
          </View>

          <Animatable.View
            style={[styles.partContainer]}
            animation="fadeInUp"
            useNativeDriver
            delay={1500}
            duration={700}>
            <Button
              title="Continue with Google"
              type={ButtonType.SECONDARY}
              icon={<GoogleLogo />}
            />

            <Button
              title="Continue with Facebook"
              type={ButtonType.SECONDARY}
              icon={<FacebookLogo />}
            />

            <Button
              title="I'll use my email"
              type={ButtonType.SECONDARY}
              outline
              pressWithDebounce
              onPress={this.navigateToLoginScreen}
            />

            <TouchableOpacity onPress={this.navigateToLoginScreen}>
              <Text
                style={[GlobalStyles.standardText, styles.existsAccountText]}>
                Already have account?
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  existsAccountText: {
    marginTop: 25,
  },
  partContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoText: {
    marginTop: 10,
  },
});
