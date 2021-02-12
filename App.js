import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {Card} from './components/card';
import Header from './components/header';
import StartGameScreen from './screens/start-game-screen';

const App = () => {
  return (
    <View style={styles.screenView}>
      <Header />
      <StartGameScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
});

export default App;
