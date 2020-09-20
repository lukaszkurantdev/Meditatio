import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {TextInput, StyleSheet, View, Text, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import Fonts from '../styles/Fonts';
import {Controller, FieldError} from 'react-hook-form';

export enum InputType {
  DEFAULT = 'default',
  PASSWORD = 'password',
  EMAIL = 'email',
}

interface IProps {
  name: string;
  error?: FieldError;
  defaultValue?: string;
  placeholder?: string;
  containerStyle?: Object;
  type?: InputType;
  multiline?: boolean;
  inputProps?: TextInputProps;
  icon?: string;
  control?: any;
  customValidation?: (value: string) => boolean;
  customMessage?: string;
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

const Input: React.FC<IProps> = ({
  name,
  defaultValue,
  containerStyle,
  type = InputType.DEFAULT,
  multiline,
  placeholder,
  inputProps,
  icon,
  control,
  error,
  customValidation,
  customMessage,
}) => {
  const validation = InputValidations[type];

  const validate = (value: string) => {
    const v = validation.func(value);

    if (v && customValidation) {
      return customValidation(value) || customMessage;
    }

    return v || validation.message;
  };

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <View
            style={[styles.borderedContainer, error && styles.errorContainer]}>
            <TextInput
              style={[styles.container, multiline && styles.multiline]}
              value={value}
              onChangeText={onChange}
              selectionColor={Colors.PRIMARY}
              onBlur={onBlur}
              secureTextEntry={type === InputType.PASSWORD}
              multiline={!!multiline}
              placeholder={placeholder}
              placeholderTextColor={Colors.LIGHTGRAY}
              testID="input-id"
              keyboardType={
                type === InputType.EMAIL ? 'email-address' : 'default'
              }
              autoCapitalize={type === InputType.EMAIL ? 'none' : 'sentences'}
              {...inputProps}
            />

            {icon && <Icon name={icon} size={15} color={Colors.PRIMARY} />}
          </View>
        )}
        name={name}
        rules={{validate}}
        defaultValue={defaultValue || ''}
      />

      {error && (
        <Text style={[GlobalStyles.errorText, styles.errorText]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

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
