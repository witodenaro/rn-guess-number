import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectMythicNumberValue} from '../redux/mythic-number/mythic-number.selectors';
import Icon from 'react-native-vector-icons/Ionicons';

import NumberContainer from '../components/number-container';
import Card from '../components/card';
import OpenSansText from '../components/open-sans-text';
import MainButton from '../components/main-button';

import MythicNumberLimits from '../constants/mythic-number-limits';
import COLORS from '../constants/colors';
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

  const [pastGuesses, setPastGuesses] = useState([currentGuess]);

  useEffect(() => {
    if (currentGuess === mythicNumber) {
      dispatch(setGuessAttemps(pastGuesses.length));
      dispatch(endGame());
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

      nextGuess = randInt(lowestGuess.current, currentGuess - 1);
    } else if (direction === DIRECTIONS.GREATER) {
      lowestGuess.current = currentGuess + 1;

      nextGuess = randInt(currentGuess + 1, greatestGuess.current);
    }

    setCurrentGuess(nextGuess);
    setPastGuesses((currentPastGuesses) => [nextGuess, ...currentPastGuesses]);
  };

  const renderedButtons = (
    <Card style={styles.buttonsContainer}>
      <MainButton
        opposite
        onPress={nextGuessHandler.bind(null, DIRECTIONS.LOWER)}>
        <Icon name="md-remove" size={20} />
      </MainButton>
      <MainButton
        secondary
        onPress={nextGuessHandler.bind(null, DIRECTIONS.GREATER)}>
        <Icon name="md-add" size={20} />
      </MainButton>
    </Card>
  );

  const renderedHistory = useMemo(
    () => (
      <FlatList
        style={styles.historyFlatList}
        contentContainerStyle={styles.historyContainer}
        data={pastGuesses}
        keyExtractor={(item) => item}
        renderItem={({item, index}) => (
          <View style={styles.historyItem}>
            <View style={styles.textContainer}>
              <OpenSansText style={styles.historyText}>
                #{pastGuesses.length - index}
              </OpenSansText>
            </View>
            <View style={styles.textContainer}>
              <OpenSansText style={styles.historyText}>{item}</OpenSansText>
            </View>
          </View>
        )}
      />
    ),
    [pastGuesses],
  );

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{...styles.screen, flex: 0}}>
        <Card style={styles.mythicNumberContainer}>
          <OpenSansText style={styles.textTitle}>Mythic number:</OpenSansText>
          <NumberContainer>{mythicNumber}</NumberContainer>
        </Card>
        <Card style={styles.guessContainer}>
          <OpenSansText style={styles.textTitle}>
            Computer's guess:{' '}
          </OpenSansText>
          <NumberContainer>{currentGuess}</NumberContainer>
        </Card>
        {renderedButtons}
        <View style={styles.historyWrapper}>
          <OpenSansText style={styles.historyTitle}>
            Previous guesses:{' '}
          </OpenSansText>

          {renderedHistory}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  buttonsContainer: {
    width: 300,
    maxWidth: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
  },
  mythicNumberContainer: {
    minWidth: 200,
    marginBottom: Dimensions.get('window').height > 600 ? 20 : 5,
  },
  guessContainer: {
    minWidth: 200,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.secondary,
  },
  gameResultContainer: {
    marginTop: 20,
  },
  historyWrapper: {
    width: '100%',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    flex: 1,
    alignItems: 'center',
  },
  historyContainer: {
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'stretch',
  },
  historyItem: {
    flex: 0,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
  },
  historyText: {
    fontSize: 20,
    textShadowRadius: 2,
    color: COLORS.secondary,
  },
  historyTitle: {
    marginBottom: Dimensions.get('window') > 600 ? 20 : 5,
    fontSize: 20,
    color: COLORS.secondary,
  },
});

export default GameScreen;
