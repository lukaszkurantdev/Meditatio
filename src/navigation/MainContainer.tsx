import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import WelcomeScreen from '../containers/WelcomeScreen';

export type RootStackParamList = {
  WelcomeScreen: undefined;
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
