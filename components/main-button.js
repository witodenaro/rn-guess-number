import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import COLORS from '../constants/colors';

const MainButton = ({children, style, opposite, secondary, ...otherProps}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        ...styles.button,
        ...style,
        backgroundColor: getBackgroundColor({opposite, secondary}),
      }}
      {...otherProps}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getBackgroundColor = (styleProps) => {
  if (styleProps.opposite) return COLORS.opposite;
  if (styleProps.secondary) return COLORS.secondary;
  return COLORS.primary;
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    textTransform: 'uppercase',
    color: 'white',
  },
});

export default MainButton;
