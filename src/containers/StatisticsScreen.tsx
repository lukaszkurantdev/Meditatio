import React from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainUserTabParamList} from '../navigation/UserTabContainer';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
import MenuButton from '../components/MenuButton';
import MenuSection from '../components/MenuSection';
import AppHeader from '../components/AppHeader';

interface IProps {
  navigation: StackNavigationProp<MainUserTabParamList, 'StatisticsScreen'>;
  route: RouteProp<MainUserTabParamList, 'StatisticsScreen'>;
}

const StatisticsScreen: React.FC<IProps> = ({}) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <AppHeader title="Statistics" description="Notice your progress" />

        <MenuSection title="General">
          <MenuButton title="Sessions this week" />
          <MenuButton title="All sessions" />
          <MenuButton title="Average session time this week" />
        </MenuSection>

        <MenuSection title="Sessions"></MenuSection>

        <MenuSection title="Breaths per session"></MenuSection>
      </ScrollView>
    </View>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 60,
    backgroundColor: Colors.BACKGROUND,
  },
  scrollPadding: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
});
