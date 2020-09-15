import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import {debounce} from 'ts-debounce';
import Colors from '../styles/Colors';

interface IProps {
  title: string;
  loading?: boolean;
  containerStyle?: ViewStyle;
  type?: ButtonType;
  onPress?: () => void;
  pressWithDebounce?: boolean;
}

enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  LIGHT = 'white',
}

const TypeColors: {[key in ButtonType]: {background: string; text: string}} = {
  primary: {
    background: Colors.PRIMARY,
    text: Colors.WHITE,
  },
  secondary: {
    background: Colors.PRIMARY,
    text: Colors.WHITE,
  },
  white: {
    background: Colors.PRIMARY,
    text: Colors.WHITE,
  },
};

const Button = ({
  title,
  loading,
  containerStyle,
  type = ButtonType.PRIMARY,
  onPress,
  pressWithDebounce,
}: IProps) => {
  const buttonColors = TypeColors[type];
  const press = pressWithDebounce ? debounce(onPress, 300) : onPress;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {backgroundColor: buttonColors.background},
        containerStyle,
      ]}
      onPress={press}>
      {loading ? (
        <ActivityIndicator color={buttonColors.text} />
      ) : (
        <Text style={[styles.buttonText, {color: buttonColors.text}]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {},
});
