import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

interface MenuSectionProps {
  title: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[GlobalStyles.sectionHeaderText, styles.header]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

export default MenuSection;

const styles = StyleSheet.create({
  sectionContainer: {
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 10,
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
});
