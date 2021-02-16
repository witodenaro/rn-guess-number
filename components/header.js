import React from 'react';
import {View, StyleSheet} from 'react-native';

import OpenSansText from '../components/open-sans-text';

import Colors from '../constants/colors';

const Header = () => {
  return (
    <View style={styles.header}>
      <OpenSansText style={styles.headerTitle}>Guess a number!</OpenSansText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
  },
});

export default Header;
