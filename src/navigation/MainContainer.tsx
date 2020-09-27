import React, {useEffect, useState} from 'react';
import Auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {MeditationSession} from '../models/MeditationSession.model';

import WelcomeScreen from '../containers/WelcomeScreen';
import LoginScreen from '../containers/LoginScreen';
import RegistrationScreen from '../containers/RegistrationScreen';
import UserTabContainer from './UserTabContainer';
import SessionScreen from '../containers/SessionScreen';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  RegistrationScreen: undefined;
  UserTabContainer: undefined;
  SessionScreen: {meditation: MeditationSession};
};

const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    console.log('login', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {!user ? (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="UserTabContainer"
              component={UserTabContainer}
            />
            <Stack.Screen name="SessionScreen" component={SessionScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
