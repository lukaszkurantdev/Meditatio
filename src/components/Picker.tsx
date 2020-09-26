import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import Modal from './Modal';
import Button, {ButtonType} from './Button';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps<T> {
  modalTitle?: string;
  onChangeItem?: (item: T) => void;
  valueToShow?: string;
  children?: (onChange: (value: T) => void) => JSX.Element;
}

function Picker<T>({
  children,
  modalTitle,
  onChangeItem,
  valueToShow,
}: IProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModalVisible = () =>
    setModalVisible((previousState) => !previousState);

  const onChange = (value: T) => {
    setSelectedValue(value);
  };

  const onSaveItem = () => {
    onChangeItem && onChangeItem(selectedValue);
    toggleModalVisible();
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={toggleModalVisible}>
        <Text style={GlobalStyles.standardText}>{valueToShow}</Text>
        <Icon
          name="chevron-down"
          size={25}
          color={Colors.PRIMARY}
          style={styles.icon}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        closeModal={toggleModalVisible}
        title={modalTitle}
        style={styles.modalContainer}>
        {children(onChange)}

        <Button
          title="Select"
          type={ButtonType.SECONDARY}
          onPress={onSaveItem}
          pressWithDebounce
        />
      </Modal>
    </>
  );
}

export default Picker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  picker: {
    width: '100%',
    height: 150,
    marginTop: 20,
    marginBottom: 15,
  },
  modalContainer: {
    alignItems: 'center',
  },
});
