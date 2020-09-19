import React from 'react';
import {View} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import Input, {InputType, InputValidations} from '../src/components/Input';

describe('Input tests', () => {
  test('Input render', () => {
    const {getByPlaceholderText} = render(<Input placeholder="email" />);
    const input = getByPlaceholderText('email');
    expect(input).toBeTruthy();
  });

  test('Email validation error', () => {
    const {getByPlaceholderText, queryByText} = render(
      <View>
        <Input placeholder="email" type={InputType.EMAIL} />
      </View>,
    );

    const input = getByPlaceholderText('email');
    fireEvent(input, 'focus');
    fireEvent.changeText(input, 'test$test.pl');
    fireEvent(input, 'blur');

    const validationError = queryByText(InputValidations.email.message);

    expect(validationError).toBeTruthy();
  });

  test('Is secure password', () => {
    const {getByTestId} = render(<Input type={InputType.PASSWORD} />);
    expect(getByTestId('input-id').props.secureTextEntry).toBeTruthy();
  });
});
