import React from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainUserTabParamList} from '../navigation/UserTabContainer';
import {ScrollView} from 'react-native-gesture-handler';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  navigation: StackNavigationProp<MainUserTabParamList, 'MeditationScreen'>;
  route: RouteProp<MainUserTabParamList, 'MeditationScreen'>;
}

const SettingsScreen: React.FC<IProps> = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      blurRadius={1}
      style={styles.mainContainer}>
      <ScrollView style={styles.scrollPadding}>
        <View>
          <Text style={GlobalStyles.hugeText}>Settings</Text>
          <Text style={[GlobalStyles.standardText]}></Text>
        </View>

        <View style={styles.sectionContainer}></View>
        <View style={styles.sectionContainer}></View>
        <View style={styles.sectionContainer}></View>
        <View style={styles.sectionContainer}></View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollPadding: {
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 200,
    marginVertical: 10,
  },
});
