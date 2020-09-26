import React from 'react';
import {StyleSheet, Dimensions, Platform, View, Text} from 'react-native';
import ModalLib from 'react-native-modal';
import {debounce} from 'ts-debounce';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  visible: boolean;
  style?: Object;
  closeModal?: () => void;
}

const Modal: React.FC<IProps> = ({visible, closeModal, style}) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android').get(
          'REAL_WINDOW_HEIGHT',
        );

  const onPressBack = () => {
    debounce(closeModal, 300);
  };

  return (
    <ModalLib
      isVisible={visible}
      backdropColor={Colors.BLACK}
      backdropOpacity={0.5}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      useNativeDriver
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      onBackdropPress={onPressBack}
      onBackButtonPress={onPressBack}
      style={[styles.container]}
      //@ts-ignore // Mising property in ts definitions
      statusBarTranslucent
      propagateSwipe={false}>
      <View style={[styles.insideContainer, style]}>
        <View style={styles.headerContainer}>
          <Text style={GlobalStyles.headerText}>Header</Text>
          <TouchableOpacity onPress={onPressBack}>
            <Icon name="x" size={25} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    </ModalLib>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
  insideContainer: {
    backgroundColor: Colors.BACKGROUND,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
