import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import Picker from './Picker';
import {WheelPicker} from 'react-native-wheel-picker-android';

import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';

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

  const onSaveItem = (value: PickerItem) => {
    setValue(value);
    onChangeItem && onChangeItem(value);
  };

  return (
    <Picker<PickerItem>
      modalTitle={modalTitle}
      onChangeItem={onSaveItem}
      valueToShow={value.label}>
      {(onChange) => (
        <WheelPicker
          selectedItem={0}
          data={items.map((v) => v.label)}
          onItemSelected={(index) => onChange(items[index])}
          selectedItemTextFontFamily={Fonts.REGULAR}
          itemTextFontFamily={Fonts.REGULAR}
          style={styles.picker}
          itemTextSize={20}
          selectedItemTextSize={20}
          selectedItemTextColor={Colors.PRIMARY}
        />
      )}
    </Picker>
  );
};

export default ListPicker;

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    height: 150,
    marginTop: 20,
    marginBottom: 15,
  },
});
