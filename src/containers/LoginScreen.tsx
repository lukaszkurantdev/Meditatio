import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
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

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
  route: RouteProp<RootStackParamList, 'LoginScreen'>;
}

type FormData = {
  email: string;
  password: string;
};

const LoginScreen: React.FC<IProps> = ({navigation}) => {
  const {control, handleSubmit, errors, watch, setError} = useForm<FormData>();
  const [fetching, setFetching] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setFetching(true);
      await Auth().signInWithEmailAndPassword(data.email, data.password);
      setFetching(false);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('email', {
          type: 'validate',
          message: 'User with this email does not exists.',
        });
      }

      if (error.code === 'auth/wrong-password') {
        setError('password', {
          type: 'validate',
          message: 'Incorrect password.',
        });
      }

      if (error.code === 'auth/user-disabled') {
        setError('email', {
          type: 'validate',
          message: 'User account is disabled.',
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
        <Button
          title="Sign in"
          type={ButtonType.SECONDARY}
          containerStyle={styles.buttonMargins}
          onPress={handleSubmit(onSubmit)}
          pressWithDebounce
          loading={fetching}
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
});
