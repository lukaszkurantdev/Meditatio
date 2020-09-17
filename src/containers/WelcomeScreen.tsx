import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Video from 'react-native-video';
import MandalaAnimatedLogo from '../components/MandalaAnimatedLogo';

interface IProps {}

export default class WelcomeScreen extends React.Component<IProps> {
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
          <MandalaAnimatedLogo />
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
