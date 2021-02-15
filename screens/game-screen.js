import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, StyleSheet, Text, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectMythicNumberValue} from '../redux/mythic-number/mythic-number.selectors';

import NumberContainer from '../components/number-container';
import Card from '../components/card';

import MythicNumberLimits from '../constants/mythic-number-limits';
import colors from '../constants/colors';
import {setGuessAttemps} from '../redux/mythic-number/mythic-number.actions';
import {endGame} from '../redux/game/game.actions';

const DIRECTIONS = {
  GREATER: 'greater',
  LOWER: 'lower',
};

const randInt = (min, max, exclude = null) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  if (randomNumber === exclude) {
    return randInt(min, max, exclude);
  }

  return randomNumber;
};

const GameScreen = () => {
  const dispatch = useDispatch();
  const mythicNumber = useSelector(selectMythicNumberValue);

  const greatestGuess = useRef(MythicNumberLimits.MAX);
  const lowestGuess = useRef(MythicNumberLimits.MIN);

  const [currentGuess, setCurrentGuess] = useState(
    randInt(MythicNumberLimits.MIN, MythicNumberLimits.MAX, mythicNumber),
  );

  const [guessesCount, setGuessesCount] = useState(1);

  useEffect(() => {
    if (currentGuess === mythicNumber) {
      dispatch(setGuessAttemps(guessesCount));
      dispatch(endGame());
    } else {
      setGuessesCount((prevGuessCount) => prevGuessCount + 1);
    }
  }, [currentGuess, mythicNumber]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === DIRECTIONS.LOWER && currentGuess < mythicNumber) ||
      (direction === DIRECTIONS.GREATER && currentGuess > mythicNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }

    let nextGuess = null;

    if (direction === DIRECTIONS.LOWER) {
      greatestGuess.current = currentGuess;

      nextGuess = randInt(lowestGuess.current + 1, currentGuess - 1);
    } else if (direction === DIRECTIONS.GREATER) {
      lowestGuess.current = currentGuess;

      nextGuess = randInt(currentGuess + 1, greatestGuess.current - 1);
    }

    setCurrentGuess(nextGuess);
  };

  const renderedButtons = (
    <Card style={styles.buttonsContainer}>
      <Button
        color={colors.opposite}
        title="LOWER"
        onPress={nextGuessHandler.bind(null, DIRECTIONS.LOWER)}
      />
      <Button
        color={colors.secondary}
        title="GREATER"
        onPress={nextGuessHandler.bind(null, DIRECTIONS.GREATER)}
      />
    </Card>
  );

  return (
    <View style={styles.screen}>
      <Card style={styles.mythicNumberContainer}>
        <Text style={styles.textTitle}>Mythic number:</Text>
        <NumberContainer>{mythicNumber}</NumberContainer>
      </Card>
      <Card style={styles.guessConainer}>
        <Text style={styles.textTitle}>Computer's guess: </Text>
        <NumberContainer>{currentGuess}</NumberContainer>
      </Card>
      {renderedButtons}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonsContainer: {
    width: 300,
    maxWidth: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  mythicNumberContainer: {
    minWidth: 200,
    marginBottom: 20,
  },
  guessConainer: {
    minWidth: 200,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.secondary,
  },
  gameResultContainer: {
    marginTop: 20,
  },
});

export default GameScreen;
