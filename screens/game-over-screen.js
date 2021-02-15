import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/card';
import NumberContainer from '../components/number-container';

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
      <Card style={styles.results}>
        <Text style={styles.resultText}>Mythic number is </Text>
        <NumberContainer>{mythicNumber}</NumberContainer>
        <Text style={styles.resultText}>Computer attemps count: </Text>
        <NumberContainer>{attemptsCount}</NumberContainer>
      </Card>
      <Card style={styles.buttonsContaier}>
        <Button title="RESTART" onPress={restartHandler} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  results: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonsContaier: {
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameOverScreen;
