import React, {useEffect, useMemo} from 'react';
import {View, StyleSheet, LogBox} from 'react-native';
import {useSelector} from 'react-redux';

import Header from './components/header';
import StartGameScreen from './screens/start-game-screen';
import GameScreen from './screens/game-screen';
import GAME_STATUS from './constants/game-status';
import {selectGameStatus} from './redux/game/game.selectors';
import GameOverScreen from './screens/game-over-screen';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';

const App = () => {
  console.log('unlocked all');
  Orientation.unlockAllOrientations();
  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const gameStatus = useSelector(selectGameStatus);

  const renderedContent = useMemo(() => {
    switch (gameStatus) {
      case GAME_STATUS.NOT_STARTED:
        return <StartGameScreen />;
      case GAME_STATUS.STARTED:
        return <GameScreen />;
      case GAME_STATUS.OVER:
        return <GameOverScreen />;
    }
  });

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
