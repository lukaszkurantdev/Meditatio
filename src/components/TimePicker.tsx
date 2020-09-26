import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';

import {TimePicker as TimePickerComponent} from 'react-native-wheel-picker-android';
import Picker from './Picker';

import Colors from '../styles/Colors';

interface IProps {
  modalTitle?: string;
  onChangeItem?: (item: Date) => void;
}

const TimePicker: React.FC<IProps> = ({modalTitle, onChangeItem}) => {
  const [value, setValue] = useState<Date>();

  const onSaveItem = (value: Date) => {
    setValue(value);
    onChangeItem && onChangeItem(value);
  };

  return (
    <Picker<Date>
      modalTitle={modalTitle}
      onChangeItem={onSaveItem}
      valueToShow={value ? moment(value).format('HH:mm') : 'Not selected'}>
      {(onChange) => (
        <TimePickerComponent
          onTimeSelected={onChange}
          selectedItemTextFontFamily={'Roboto'}
          itemTextFontFamily={'Roboto'}
          style={styles.picker}
          itemTextSize={20}
          selectedItemTextSize={20}
          selectedItemTextColor={Colors.PRIMARY}
          format24
        />
      )}
    </Picker>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  picker: {
    width: 150,
    height: 150,
    marginTop: 20,
    marginBottom: 15,
  },
});
