import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

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
    <View style={styles.container}>
      <FunctionalIconButton
        iconName="align-left"
        iconColor={Colors.PRIMARY}
        onPress={navigation.goBack}
      />

      <View style={styles.headerMargins}>
        <Text style={GlobalStyles.hugeText}>Sign in</Text>
        <Text style={[GlobalStyles.standardText, styles.inputMargins]}>
          Enter the world of silence and contemplation
        </Text>
      </View>

      <View style={styles.form}>
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
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: Colors.BACKGROUND,
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
