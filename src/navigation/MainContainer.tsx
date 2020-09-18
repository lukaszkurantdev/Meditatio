import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import WelcomeScreen from '../containers/WelcomeScreen';
import LoginScreen from '../containers/LoginScreen';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default class MainStackNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
