import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Card = ({children, style}) => {
  return <View style={{...styles.card, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default Card;
