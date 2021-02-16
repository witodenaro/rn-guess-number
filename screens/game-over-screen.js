import React from 'react';
import {View, StyleSheet, Button, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Card from '../components/card';
import OpenSansText from '../components/open-sans-text';
import MainButton from '../components/main-button';

import {resetGame} from '../redux/game/game.actions';
import {
  selectGuessAttempsCount,
  selectMythicNumberValue,
} from '../redux/mythic-number/mythic-number.selectors';

const GameOverScreen = () => {
  const dispatch = useDispatch();
  const mythicNumber = useSelector(selectMythicNumberValue);
  const attemptsCount = useSelector(selectGuessAttempsCount);

  const restartHandler = () => {
    dispatch(resetGame());
  };

  return (
    <View style={styles.screen}>
      <Image
        source={require('../assets/success.png')}
        style={styles.backgroundImage}
      />
      <Card style={styles.results}>
        <OpenSansText style={styles.resultText}>
          Your phone needed{' '}
          <OpenSansText style={styles.highlighted}>
            {attemptsCount}
          </OpenSansText>{' '}
          attempts to guess your number{' '}
          <OpenSansText style={styles.highlighted}>{mythicNumber}</OpenSansText>{' '}
        </OpenSansText>
      </Card>
      <MainButton
        opposite
        style={styles.restartButton}
        onPress={restartHandler}>
        Restart
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  results: {
    marginHorizontal: 20,
    marginTop: 140,
    alignItems: 'center',
  },
  buttonsContaier: {
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {width: '100%', height: '100%', position: 'absolute'},
  highlighted: {
    color: 'red',
  },
  resultText: {
    textAlign: 'center',
  },
  restartButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default GameOverScreen;
