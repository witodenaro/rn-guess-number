import React, {useMemo, useState} from 'react';

import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import Header from './components/header';
import StartGameScreen from './screens/start-game-screen';
import GameScreen from './screens/game-screen';
import {selectGameStarted} from './redux/game/game.selectors';

const App = () => {
  const gameStarted = useSelector(selectGameStarted);

  const renderedContent = useMemo(() =>
    gameStarted ? <GameScreen /> : <StartGameScreen />,
  );

  return (
    <View style={styles.screenView}>
      <Header />
      {renderedContent}
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
});

export default App;
