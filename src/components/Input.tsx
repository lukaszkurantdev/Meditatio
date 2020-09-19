import React, {useImperativeHandle, useState} from 'react';
import {TextInput, StyleSheet, View, Text, TextInputProps} from 'react-native';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import Fonts from '../styles/Fonts';

export enum InputType {
  DEFAULT = 'default',
  PASSWORD = 'password',
  EMAIL = 'email',
}

interface IProps {
  placeholder?: string;
  containerStyle?: Object;
  type?: InputType;
  multiline?: boolean;
  inputProps?: TextInputProps;
}

const Validations: {
  [key in InputType]: {message: string; func: (value: string) => boolean};
} = {
  default: {
    message: "The field can't be empty.",
    func: (value: string) => !!value,
  },
  password: {
    message: 'Incorrect password.',
    func: (value: string) => value.length >= 8,
  },
  email: {
    message: 'Incorrect email.',
    func: (value: string) =>
      /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-+]+)*@[a-zA-Z0-9-]{1,60}(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/.test(
        value,
      ),
  },
};

const Input: React.FC<IProps> = (
  {
    containerStyle,
    type = InputType.DEFAULT,
    multiline,
    placeholder,
    inputProps,
  }: IProps,
  reference,
) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setValidity = (error: boolean, message: string = '') => {
    setError(error);
    setErrorMessage(message);
  };

  const validate = (): boolean => {
    const validationType = Validations[type || 'default'];
    const validate = validationType.func(value);

    if (!validate) {
      setValidity(true, validationType.message);
    } else if (error) {
      setValidity(false);
    }

    return value.length !== 0 && validate;
  };

  const onFocus = () => {
    if (error) {
      setValidity(false);
    }
  };

  useImperativeHandle(reference, () => ({
    getValue: () => {
      return value;
    },
    setValidity: (error: boolean, message: string = '') =>
      setValidity(error, message),
    validate,
  }));

  return (
    <View style={containerStyle}>
      <TextInput
        style={[
          styles.container,
          multiline && styles.multiline,
          error && styles.errorContainer,
        ]}
        value={value}
        onChangeText={setValue}
        selectionColor={Colors.PRIMARY}
        onFocus={onFocus}
        secureTextEntry={type === InputType.PASSWORD}
        multiline={!!multiline}
        placeholder={placeholder}
        {...inputProps}
      />

      {!!errorMessage && (
        <Text style={[GlobalStyles.errorText, styles.errorText]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    fontFamily: Fonts.REGULAR,
    marginVertical: 5,
  },
  multiline: {
    height: 100,
  },
  errorContainer: {
    borderColor: Colors.DANGER,
  },
  errorText: {
    marginHorizontal: 15,
    marginVertical: 3,
  },
});
