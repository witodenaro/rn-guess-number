import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import OpenSansText from '../components/open-sans-text';
import Card from '../components/card';
import Input from '../components/input';
import NumberContainer from '../components/number-container';
import Colors from '../constants/colors';
import MainButton from '../components/main-button';
import MythicNumberLimits from '../constants/mythic-number-limits';
import {startGame} from '../redux/game/game.actions';

import {changeMythicNumber} from '../redux/mythic-number/mythic-number.actions';
import {selectMythicNumberValue} from '../redux/mythic-number/mythic-number.selectors';

const StartGameScreen = () => {
  const mythicNumber = useSelector(selectMythicNumberValue);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const numberInputHandler = useCallback((text) => {
    setInputText(text.replace(/\D/g, ''));
  }, []);

  const resetInputHandler = useCallback(() => {
    setInputText('');
    setConfirmed(false);
  }, []);

  const confirmInputHandler = useCallback(() => {
    const chosenNumber = parseInt(inputText);
    if (
      isNaN(chosenNumber) ||
      chosenNumber < MythicNumberLimits.MIN ||
      chosenNumber > MythicNumberLimits.MAX
    ) {
      Alert.alert(
        'Invalid number!',
        `Number must be chosen between ${MythicNumberLimits.MIN} and ${MythicNumberLimits.MAX}`,
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }

    Keyboard.dismiss();
    dispatch(changeMythicNumber(chosenNumber));
    setInputText('');
    setConfirmed(true);
  }, [inputText]);

  const startGameHandler = useCallback(() => {
    dispatch(startGame());
  }, []);

  const renderedConfirmed = confirmed ? (
    <Card style={styles.outputContainer}>
      <OpenSansText style={styles.outputText}>Chosen number is: </OpenSansText>
      <NumberContainer>{mythicNumber}</NumberContainer>
      <MainButton onPress={startGameHandler}>Let's go</MainButton>
    </Card>
  ) : null;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <OpenSansText style={styles.title}>Start a New Game!</OpenSansText>
        <Card style={styles.inputContainer}>
          <OpenSansText>Select a Number</OpenSansText>
          <Input
            style={styles.input}
            maxLength={2}
            keyboardType="number-pad"
            autoCorrect={false}
            value={inputText}
            onSubmitEditing={confirmInputHandler}
            onChangeText={numberInputHandler}
          />
          <View style={styles.buttonsContainer}>
            <MainButton
              style={styles.button}
              opposite
              onPress={resetInputHandler}>
              Reset
            </MainButton>
            <MainButton style={styles.button} onPress={confirmInputHandler}>
              Confirm
            </MainButton>
          </View>
        </Card>
        {renderedConfirmed}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  input: {
    width: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: '45%',
  },
  outputContainer: {
    marginTop: 20,
  },
});

export default StartGameScreen;
