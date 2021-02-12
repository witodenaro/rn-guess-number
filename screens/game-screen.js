import React, {useMemo, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectMythicNumberValue} from '../redux/mythic-number/mythic-number.selectors';

import NumberContainer from '../components/number-container';
import Card from '../components/card';

import MythicNumberLimits from '../constants/mythic-number-limits';
import colors from '../constants/colors';

const randInt = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  if (randomNumber === exclude) {
    return randInt(min, max, exclude);
  }

  return randomNumber;
};

const GameScreen = () => {
  const mythicNumber = useSelector(selectMythicNumberValue);

  const [currentGuess, setCurrentGuess] = useState(
    randInt(MythicNumberLimits.MIN, MythicNumberLimits.MAX, mythicNumber),
  );

  const lowerPressHandler = () => {
    setCurrentGuess(randInt(MythicNumberLimits.MIN, currentGuess - 1));
  };

  const higherPressHandler = () => {
    setCurrentGuess(randInt(currentGuess + 1, MythicNumberLimits.MAX));
  };

  const renderedResult = useMemo(
    () => (currentGuess === mythicNumber ? <Text>Computer won!</Text> : null),
    [currentGuess === mythicNumber],
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
      <Card style={styles.buttonsContainer}>
        <Button
          color={colors.opposite}
          title="LOWER"
          onPress={lowerPressHandler}
        />
        <Button
          color={colors.secondary}
          title="GREATER"
          onPress={higherPressHandler}
        />
      </Card>
      {renderedResult}
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
});

export default GameScreen;
