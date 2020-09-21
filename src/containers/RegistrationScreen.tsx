import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Auth from '@react-native-firebase/auth';
import {useForm} from 'react-hook-form';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainContainer';

import Input, {InputType} from '../components/Input';
import Button, {ButtonType} from '../components/Button';

import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
import FunctionalIconButton from '../components/FunctionalIconButton';
import MandalaAnimatedLogo from '../components/MandalaAnimatedLogo';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, 'RegistrationScreen'>;
  route: RouteProp<RootStackParamList, 'RegistrationScreen'>;
}

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegistrationScreen: React.FC<IProps> = ({navigation}) => {
  const {control, handleSubmit, errors, watch, setError} = useForm<FormData>();
  const [fetching, setFetching] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setFetching(true);
      await Auth().createUserWithEmailAndPassword(data.email, data.password);
      setFetching(false);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('email', {
          type: 'validate',
          message: 'User with this email already axists.',
        });
      }

      setFetching(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.containerContent}
      keyboardShouldPersistTaps={'handled'}
      style={styles.container}>
      <View style={styles.iconContainer}>
        <MandalaAnimatedLogo isSmall color={Colors.PRIMARY} />
      </View>

      <View style={styles.headerMargins}>
        <Text style={GlobalStyles.hugeText}>Sign up</Text>
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
          name="email"
          placeholder={'Email'}
          type={InputType.EMAIL}
          icon="mail"
          containerStyle={styles.inputMargins}
          error={errors.email}
          control={control}
        />

        <Input
          name="password"
          placeholder={'Password'}
          type={InputType.PASSWORD}
          icon="key"
          containerStyle={styles.inputMargins}
          error={errors.password}
          control={control}
        />

        <Input
          name="confirmPassword"
          placeholder={'Confirm password'}
          type={InputType.PASSWORD}
          icon="key"
          containerStyle={styles.inputMargins}
          error={errors.confirmPassword}
          control={control}
          customValidation={(value) => watch('password') === value}
          customMessage="Passwords don't match."
        />

        <Button
          title="Sign up"
          type={ButtonType.SECONDARY}
          containerStyle={styles.buttonMargins}
          onPress={handleSubmit(onSubmit)}
          pressWithDebounce
          loading={fetching}
        />

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={[GlobalStyles.standardText, styles.existsAccountText]}>
            You have account? <Text style={styles.highlight}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  containerContent: {
    paddingHorizontal: 20,
    paddingVertical: 50,
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
  iconContainer: {
    height: 40,
    width: 40,
  },
});
