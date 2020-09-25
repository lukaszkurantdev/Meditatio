import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

interface AppHeaderSectionProps {
  title: string;
  description?: string;
}

const AppHeader: React.FC<AppHeaderSectionProps> = ({title, description}) => {
  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.hugeText}>{title}</Text>
      {description && (
        <Text style={[GlobalStyles.standardText, styles.description]}>
          {description}
        </Text>
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  description: {
    marginTop: 10,
  },
});
