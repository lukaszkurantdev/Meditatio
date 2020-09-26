import React from 'react';
import {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import Modal from './Modal';
import {TimePicker as TimePickerComponent} from 'react-native-wheel-picker-android';
import Button, {ButtonType} from './Button';
import moment from 'moment';

interface IProps {
  modalTitle?: string;
  onChangeItem?: (item: Date) => void;
}

const TimePicker: React.FC<IProps> = ({modalTitle, onChangeItem}) => {
  const [value, setValue] = useState<Date>(null);
  const [selectedValue, setSelectedValue] = useState<Date>(new Date());
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModalVisible = () =>
    setModalVisible((previousState) => !previousState);

  const onSaveItem = () => {
    setValue(selectedValue);
    onChangeItem && onChangeItem(selectedValue);
    toggleModalVisible();
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={toggleModalVisible}>
        <Text style={GlobalStyles.standardText}>
          {value ? moment(value).format('HH:mm') : 'Not selected'}
        </Text>
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
        <TimePickerComponent
          onTimeSelected={(date) => setSelectedValue(date)}
          selectedItemTextFontFamily={'Roboto'}
          itemTextFontFamily={'Roboto'}
          style={styles.picker}
          itemTextSize={20}
          selectedItemTextSize={20}
          selectedItemTextColor={Colors.PRIMARY}
          format24
        />
        <Button
          title="Select"
          type={ButtonType.SECONDARY}
          onPress={onSaveItem}
          pressWithDebounce
        />
      </Modal>
    </>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  picker: {
    width: 150,
    height: 150,
    marginTop: 20,
    marginBottom: 15,
  },
  modalContainer: {
    alignItems: 'center',
  },
});
