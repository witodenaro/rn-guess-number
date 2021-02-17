import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

const Card = ({children, style}) => {
  const [cardPadding, setCardPadding] = useState(
    Dimensions.get('window').height > 600 ? 20 : 5,
  );

  useEffect(() => {
    const updateLayout = () => {
      setCardPadding(Dimensions.get('window').height > 600 ? 20 : 5);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  return (
    <View style={{padding: cardPadding, ...styles.card, ...style}}>
      {children}
    </View>
  );
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
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default Card;
