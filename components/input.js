import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = ({style, ...otherProps}) => {
  return <TextInput {...otherProps} style={{...styles.input, ...style}} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 0,
  },
});

export default Input;
