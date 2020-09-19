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
import Fonts from '../styles/Fonts';

interface IProps {
  title: string;
  loading?: boolean;
  containerStyle?: ViewStyle;
  type?: ButtonType;
  onPress?: () => void;
  pressWithDebounce?: boolean;
  outline?: boolean;
  icon?: JSX.Element;
}

export enum ButtonType {
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
    background: Colors.WHITE,
    text: Colors.BLACK,
  },
  white: {
    background: Colors.PRIMARY,
    text: Colors.WHITE,
  },
};

const Button: React.FC<IProps> = ({
  title,
  loading,
  containerStyle,
  type = ButtonType.PRIMARY,
  onPress,
  pressWithDebounce,
  outline,
  icon,
}: IProps) => {
  const buttonColors = TypeColors[type];
  const press = pressWithDebounce ? debounce(onPress, 300) : onPress;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      testID="button-id"
      style={[
        styles.container,
        {borderColor: buttonColors.background},
        !outline && {backgroundColor: buttonColors.background},
        outline && styles.outlineContainer,
        containerStyle,
      ]}
      onPress={press}>
      {loading ? (
        <ActivityIndicator
          color={buttonColors.text}
          testID="button-loader-id"
        />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.buttonText,
              {color: outline ? buttonColors.background : buttonColors.text},
              icon && styles.textNearIcon,
            ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  outlineContainer: {
    borderWidth: 1,
  },
  textNearIcon: {
    marginLeft: 5,
  },
  buttonText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 15,
  },
});
