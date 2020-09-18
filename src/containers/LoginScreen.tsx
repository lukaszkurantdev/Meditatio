import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainContainer';
import Button, {ButtonType} from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
  route: RouteProp<RootStackParamList, 'LoginScreen'>;
}

export default class LoginScreen extends React.Component<IProps> {
  render() {
    return (
      <ImageBackground
        blurRadius={6}
        source={require('../assets/images/background.jpg')}
        style={styles.container}>
        <Text style={[GlobalStyles.headerText]}>Sign in</Text>
        <Button title="Sign in" type={ButtonType.SECONDARY} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
