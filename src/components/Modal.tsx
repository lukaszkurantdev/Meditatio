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
  title?: string;
}

const Modal: React.FC<IProps> = ({
  visible,
  closeModal,
  style,
  title,
  children,
}) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android').get(
          'REAL_WINDOW_HEIGHT',
        );

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
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={[styles.container]}
      //@ts-ignore // Mising property in ts definitions
      statusBarTranslucent>
      <View style={styles.insideContainer}>
        <View style={styles.headerContainer}>
          <Text style={GlobalStyles.headerText}>{title}</Text>
          <TouchableOpacity onPress={() => closeModal()}>
            <Icon name="x" size={25} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
        <View style={style}>{children}</View>
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
