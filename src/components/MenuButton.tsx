import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface MenuButtonProps {
  rightContent?: JSX.Element;
  onPress?: () => void;
  iconName?: string;
  title: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  iconName,
  onPress,
  rightContent,
  title,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={!!onPress ? 0.5 : 1}>
      <View style={styles.insideContainer}>
        {iconName && (
          <Icon
            name={iconName}
            size={20}
            color={Colors.PRIMARY}
            style={styles.icon}
          />
        )}
        <Text style={[GlobalStyles.standardText, styles.title]}>{title}</Text>
      </View>
      {rightContent}
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  container: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    opacity: 0.8,
  },
});
