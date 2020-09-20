import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainContainer';

import Input, {InputType} from '../components/Input';
import Button, {ButtonType} from '../components/Button';

import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
import FunctionalIconButton from '../components/FunctionalIconButton';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
  route: RouteProp<RootStackParamList, 'LoginScreen'>;
}

const LoginScreen: React.FC<IProps> = ({navigation}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.containerContent}
      style={styles.container}>
      <FunctionalIconButton
        iconName="home"
        size={20}
        iconColor={Colors.PRIMARY}
        onPress={navigation.goBack}
      />

      <View style={styles.headerMargins}>
        <Text style={GlobalStyles.hugeText}>Sign in</Text>
        <Text style={[GlobalStyles.standardText, styles.inputMargins]}>
          Enter the world of silence and contemplation
        </Text>
      </View>

      <Animatable.View
        style={styles.form}
        animation="fadeInUp"
        useNativeDriver
        duration={700}>
        <Input
          placeholder={'Email'}
          type={InputType.EMAIL}
          icon={<Icon name="mail" size={15} color={Colors.PRIMARY} />}
          containerStyle={styles.inputMargins}
        />
        <Input
          placeholder={'Password'}
          type={InputType.PASSWORD}
          icon={<Icon name="key" size={15} color={Colors.PRIMARY} />}
          containerStyle={styles.inputMargins}
        />
        <Button
          title="Sign in"
          type={ButtonType.SECONDARY}
          containerStyle={styles.buttonMargins}
        />

        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={[GlobalStyles.standardText, styles.existsAccountText]}>
            You don't have account yet?{' '}
            <Text style={styles.highlight}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  containerContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logoContainer: {
    height: 60,
    width: 60,
    marginTop: 20,
  },
  inputMargins: {
    marginVertical: 10,
  },
  headerMargins: {
    marginTop: 60,
    marginBottom: 60,
  },
  buttonMargins: {
    marginTop: 30,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  existsAccountText: {
    marginTop: 25,
  },
  highlight: {
    color: Colors.PRIMARY,
  },
});
