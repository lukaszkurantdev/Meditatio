import {StyleSheet} from 'react-native';
import Colors from './Colors';
import Fonts from './Fonts';

const GlobalStyles = StyleSheet.create({
  logoText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 25,
    color: Colors.WHITE,
  },
  hugeText: {
    fontFamily: Fonts.BOLD,
    fontSize: 40,
    color: Colors.WHITE,
  },
  headerText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 20,
    color: Colors.WHITE,
  },
  standardText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 15,
    color: Colors.WHITE,
  },
  errorText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 13,
    color: Colors.DANGER,
  },
});

export default GlobalStyles;
