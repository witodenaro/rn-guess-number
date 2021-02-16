import React from 'react';
import {Text, StyleSheet} from 'react-native';

const OpenSansText = ({children, style}) => (
  <Text style={{...styles.text, ...style}}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
  },
});

export default OpenSansText;
