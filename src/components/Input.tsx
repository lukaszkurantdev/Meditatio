import React, {forwardRef, useImperativeHandle, useState} from 'react';
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
  icon?: JSX.Element;
}

export const InputValidations: {
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

const Input: React.FC<IProps> = forwardRef(
  (
    {
      containerStyle,
      type = InputType.DEFAULT,
      multiline,
      placeholder,
      inputProps,
      icon,
    },
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
      const validationType = InputValidations[type || 'default'];
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
      setValidity,
      validate,
    }));

    return (
      <View style={[styles.mainContainer, containerStyle]}>
        <View
          style={[styles.borderedContainer, error && styles.errorContainer]}>
          <TextInput
            style={[styles.container, multiline && styles.multiline]}
            value={value}
            onChangeText={setValue}
            selectionColor={Colors.PRIMARY}
            onFocus={onFocus}
            onBlur={validate}
            secureTextEntry={type === InputType.PASSWORD}
            multiline={!!multiline}
            placeholder={placeholder}
            placeholderTextColor={Colors.LIGHTGRAY}
            testID="input-id"
            {...inputProps}
          />
          {icon}
        </View>
        {!!errorMessage && (
          <Text style={[GlobalStyles.errorText, styles.errorText]}>
            {errorMessage}
          </Text>
        )}
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  borderedContainer: {
    flexDirection: 'row',
    borderColor: Colors.WHITE,
    borderBottomWidth: 1,
    height: 40,
    alignItems: 'center',
    paddingRight: 10,
  },
  container: {
    fontFamily: Fonts.REGULAR,
    color: Colors.WHITE,
    flex: 1,
    marginRight: 10,
    padding: 0,
  },
  multiline: {
    height: 100,
  },
  errorContainer: {
    borderColor: Colors.DANGER,
  },
  errorText: {
    marginVertical: 3,
  },
});
