import {StyleSheet} from 'react-native';
import Colors from './Colors';
import Fonts from './Fonts';

const GlobalStyles = StyleSheet.create({
  logoText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 25,
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

  errorText: {},
});

export default GlobalStyles;
