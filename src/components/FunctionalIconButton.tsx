import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {debounce} from 'ts-debounce';

import Colors from '../styles/Colors';

interface IProps {
  iconName: string;
  iconColor?: string;
  size?: number;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  pressWithDebounce?: boolean;
}

const FunctionalIconButton: React.FC<IProps> = ({
  iconName,
  iconColor = Colors.WHITE,
  size = 25,
  containerStyle,
  onPress,
  pressWithDebounce,
}: IProps) => {
  const press = pressWithDebounce ? debounce(onPress, 300) : onPress;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={containerStyle}
      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      onPress={press}>
      <Icon name={iconName} size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

export default FunctionalIconButton;
