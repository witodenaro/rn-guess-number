import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

const Card = ({children, style}) => {
  return <View style={{...styles.card, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: Dimensions.get('window').height > 600 ? 20 : 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default Card;
