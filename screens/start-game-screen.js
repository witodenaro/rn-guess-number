import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import OpenSansText from '../components/open-sans-text';
import Card from '../components/card';
import Input from '../components/input';
import NumberContainer from '../components/number-container';
import MainButton from '../components/main-button';
import MythicNumberLimits from '../constants/mythic-number-limits';
import {startGame} from '../redux/game/game.actions';

import {changeMythicNumber} from '../redux/mythic-number/mythic-number.actions';
import {selectMythicNumberValue} from '../redux/mythic-number/mythic-number.selectors';
import Orientation from 'react-native-orientation-locker';

const StartGameScreen = () => {
  console.log('locked to portrait');
  Orientation.lockToPortrait();

  const mythicNumber = useSelector(selectMythicNumberValue);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');

  const numberInputHandler = useCallback((text) => {
    setInputText(text.replace(/\D/g, ''));
  }, []);

  const resetInputHandler = useCallback(() => {
    setInputText('');
    dispatch(changeMythicNumber(null));
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
        [{text: 'Okay', style: 'destructive'}],
      );
      return;
    }

    Keyboard.dismiss();
    dispatch(changeMythicNumber(chosenNumber));
    setInputText('');
  }, [inputText]);

  const startGameHandler = useCallback(() => {
    dispatch(startGame());
  }, []);

  const renderedConfirmed = !!mythicNumber ? (
    <Card style={styles.confirmContainer}>
      <OpenSansText style={styles.outputText}>Chosen number is: </OpenSansText>
      <NumberContainer>{mythicNumber}</NumberContainer>
      <MainButton onPress={startGameHandler}>Let's go</MainButton>
      <MainButton style={styles.button} opposite onPress={resetInputHandler}>
        Reset
      </MainButton>
    </Card>
  ) : null;

  const renderSelectNumber = (mythicNumber) =>
    !!mythicNumber ? null : (
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
          <MainButton style={styles.button} onPress={confirmInputHandler}>
            Confirm
          </MainButton>
        </View>
      </Card>
    );

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <OpenSansText style={styles.title}>Start a New Game!</OpenSansText>
            {renderedConfirmed}
            {renderSelectNumber(mythicNumber)}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
    width: 200,
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
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 5,
    width: '100%',
  },
  confirmContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default StartGameScreen;
