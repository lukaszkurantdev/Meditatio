import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Colors from '../styles/Colors';
import WelcomeScreen from '../containers/WelcomeScreen';
import Icon from 'react-native-vector-icons/EvilIcons';
import {ImageBackground, StatusBar, View} from 'react-native';
import MeditationScreen from '../containers/MeditationScreen';

export type MainUserTabParamList = {
  MeditationScreen: undefined;
  StatisticsScreen: undefined;
  SettingsScreen: undefined;
};

const Tab = createBottomTabNavigator<MainUserTabParamList>();

const UserTabContainer = () => {
  return (
    <NavigationContainer independent>
      <StatusBar translucent backgroundColor="transparent" />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName: string = '';

            if (route.name === 'MeditationScreen') {
              iconName = 'eye';
            } else if (route.name === 'StatisticsScreen') {
              iconName = 'trophy';
            } else if (route.name === 'SettingsScreen') {
              iconName = 'user';
            }

            return <Icon name={iconName} size={35} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.PRIMARY,
          inactiveTintColor: Colors.WHITE,
          keyboardHidesTabBar: true,
          showLabel: false,

          tabStyle: {
            height: 60,
            // backgroundColor: 'rgba(255,255,255,0.09)',
            elevation: 0,
          },
          style: {
            height: 60,
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.01)',
            borderWidth: 0,
            borderTopColor: 'rgba(255,255,255,0.1)',
          },
        }}>
        <Tab.Screen name="MeditationScreen" component={MeditationScreen} />
        <Tab.Screen name="StatisticsScreen" component={WelcomeScreen} />
        <Tab.Screen name="SettingsScreen" component={WelcomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default UserTabContainer;
