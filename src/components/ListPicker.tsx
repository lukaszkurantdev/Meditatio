import React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import Modal from './Modal';
import {WheelPicker} from 'react-native-wheel-picker-android';
import Fonts from '../styles/Fonts';
import Button, {ButtonType} from './Button';

interface PickerItem {
  value: string | number;
  label: string;
}

interface IProps {
  items: PickerItem[];
  modalTitle?: string;
  onChangeItem?: (item: PickerItem) => void;
}

const ListPicker: React.FC<IProps> = ({items, modalTitle, onChangeItem}) => {
  const [value, setValue] = useState<PickerItem>(items[0]);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModalVisible = () =>
    setModalVisible((previousState) => !previousState);

  const onChange = (index: number) => {
    setSelectedValue(index);
  };

  const onSaveItem = () => {
    setValue(items[selectedValue]);
    onChangeItem && onChangeItem(items[selectedValue]);
    toggleModalVisible();
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={toggleModalVisible}>
        <Text style={GlobalStyles.standardText}>{value.label}</Text>
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
        <WheelPicker
          selectedItem={0}
          data={items.map((v) => v.label)}
          onItemSelected={onChange}
          selectedItemTextFontFamily={Fonts.REGULAR}
          itemTextFontFamily={Fonts.REGULAR}
          style={styles.picker}
          itemTextSize={20}
          selectedItemTextSize={20}
          selectedItemTextColor={Colors.PRIMARY}
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

export default ListPicker;

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
