import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Button from '../src/components/Button';

describe('Button tests', () => {
  test('Button loading', () => {
    const {getByTestId} = render(<Button title="test" loading />);
    const loader = getByTestId('button-loader-id');

    expect(loader).toBeTruthy();
  });

  test('Button debounce', async () => {
    const mock = jest.fn();
    const {getByText} = render(
      <Button title="test-button" onPress={mock} pressWithDebounce />,
    );
    const button = getByText('test-button');

    //Simulate multi press
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);

    expect(mock).toHaveBeenCalledTimes(0);

    waitFor(
      () => {
        expect(mock).toHaveBeenCalledTimes(1);
      },
      {timeout: 350},
    );
  });
});
