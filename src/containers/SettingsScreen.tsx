import React, {useState} from 'react';
import {StyleSheet, ImageBackground, View, Text, Switch} from 'react-native';
import Auth from '@react-native-firebase/auth';

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
  navigation: StackNavigationProp<MainUserTabParamList, 'MeditationScreen'>;
  route: RouteProp<MainUserTabParamList, 'MeditationScreen'>;
}

const SettingsScreen: React.FC<IProps> = ({}) => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const toggleSwitch = () =>
    setIsMusicEnabled((previousState) => !previousState);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <AppHeader title="Settings" description="Control yourself" />

        <MenuSection title="General">
          <MenuButton title="Daily reminder" iconName="clock" />
          <MenuButton title="Language" iconName="globe" />
        </MenuSection>

        <MenuSection title="Sounds">
          <MenuButton
            title="Music during meditation"
            iconName="volume-2"
            rightContent={
              <Switch
                trackColor={{false: Colors.BACKGROUND, true: Colors.BACKGROUND}}
                thumbColor={isMusicEnabled ? Colors.PRIMARY : '#f4f3f4'}
                ios_backgroundColor={Colors.BACKGROUND}
                onValueChange={toggleSwitch}
                value={isMusicEnabled}
              />
            }
          />
          <MenuButton title="Stop signal" iconName="stop-circle" />
        </MenuSection>

        <MenuSection title="Others">
          <MenuButton title="Connected device" iconName="watch" />
          <MenuButton title="Rate application" iconName="star" />
          <MenuButton title="Privacy Policy & Rules" iconName="info" />
          <MenuButton
            title="Log out"
            iconName="log-out"
            onPress={() => Auth().signOut()}
          />
        </MenuSection>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

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
