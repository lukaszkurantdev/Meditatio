import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import WelcomeScreen from './src/containers/WelcomeScreen';

const App = () => {
  return (
    <>
      <WelcomeScreen />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
