import React, {useEffect, useState} from 'react';
import {View, ImageBackground, StyleSheet, Text, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainContainer';

import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Colors from '../styles/Colors';
import Button, {ButtonType} from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import MandalaAnimatedLogo from '../components/MandalaAnimatedLogo';
import FunctionalIconButton from '../components/FunctionalIconButton';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, 'SessionScreen'>;
  route: RouteProp<RootStackParamList, 'SessionScreen'>;
}

let sessionInterval: NodeJS.Timeout;

const SessionScreen: React.FC<IProps> = ({route, navigation}) => {
  const [started, setStarted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [ended, setEnded] = useState<boolean>(false);

  const {meditation} = route.params;
  const percent = meditation.duration / 100;

  const pressMainButton = () => {
    if (!started) {
      sessionInterval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, percent);

      StatusBar.setHidden(true, 'fade');
    } else {
      clearInterval(sessionInterval);
      StatusBar.setHidden(false, 'fade');
    }

    setStarted((prev) => !prev);
  };

  const onSessionEnd = () => {
    setEnded(true);
    setStarted(false);
    const duration = percent * progress;
  };

  useEffect(() => {
    if (progress >= 100) {
      clearInterval(sessionInterval);
      onSessionEnd();
    }
  });

  return (
    <ImageBackground source={meditation.background} style={styles.container}>
      {!ended ? (
        <View style={styles.insideContainer}>
          <AnimatedCircularProgress
            size={220}
            width={1}
            fill={progress}
            rotation={0}
            tintColor={Colors.WHITE}
            backgroundColor={'rgba(255,255,255,0.1)'}
            lineCap={'round'}>
            {(fill) => (
              <View
                style={{
                  height: 200,
                  width: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 200,
                }}>
                <FunctionalIconButton
                  iconName={'pause'}
                  onPress={pressMainButton}
                />
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={[GlobalStyles.hugeText, styles.timeText]}>II:II</Text>
        </View>
      ) : (
        <View style={styles.insideContainer}>
          <Text style={GlobalStyles.logoText}>Meditation ended</Text>

          <View style={styles.statContainer}>
            <Text style={GlobalStyles.standardText}>
              Duration time: {Math.round((percent * progress) / 60)}
            </Text>
            <Text style={GlobalStyles.standardText}>Breaths: 100</Text>
          </View>

          <Button
            title="Go back"
            type={ButtonType.SECONDARY}
            onPress={navigation.goBack}
          />
        </View>
      )}
    </ImageBackground>
  );
};

export default SessionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  insideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContainer: {
    marginVertical: 30,
  },
  timeText: {
    marginTop: 40,
  },
});
