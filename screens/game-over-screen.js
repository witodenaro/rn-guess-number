import React from 'react';
import {View, StyleSheet, Button, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Card from '../components/card';
import Text from '../components/text';

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
        <Text style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.highlighted}>{attemptsCount}</Text> attempts to
          guess your number{' '}
          <Text style={styles.highlighted}>{mythicNumber}</Text>{' '}
        </Text>
      </Card>
      <View style={styles.buttonsContaier}>
        <Button title="RESTART" onPress={restartHandler} />
      </View>
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
});

export default GameOverScreen;
