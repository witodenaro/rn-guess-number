import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import Card from '../components/card';
import Input from '../components/input';
import NumberContainer from '../components/number-container';
import Colors from '../constants/colors';

const MIN_MYSTIC_NUMBER = 1;
const MAX_MYSTIC_NUMBER = 99;

const StartGameScreen = () => {
  const [inputText, setInputText] = useState('');
  const [mysticNumber, setMysticNumber] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const numberInputHandler = (text) => {
    setInputText(text.replace(/\D/g, ''));
  };

  const resetInputHandler = () => {
    setInputText('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(inputText);
    if (
      isNaN(chosenNumber) ||
      chosenNumber < MIN_MYSTIC_NUMBER ||
      chosenNumber > MAX_MYSTIC_NUMBER
    ) {
      Alert.alert(
        'Invalid number!',
        `Number must be chosen between ${MIN_MYSTIC_NUMBER} and ${MAX_MYSTIC_NUMBER}`,
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }

    Keyboard.dismiss();
    setMysticNumber(chosenNumber);
    setInputText('');
    setConfirmed(true);
  };

  const renderedConfirmed = confirmed ? (
    <Card style={styles.outputContainer}>
      <Text style={styles.outputText}>Chosen number is: </Text>
      <NumberContainer>{mysticNumber}</NumberContainer>
      <Button title="Let's go" color={Colors.primary} />
    </Card>
  ) : null;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            maxLength={2}
            keyboardType="number-pad"
            autoCorrect={false}
            autoCapitalize={false}
            value={inputText}
            onSubmitEditing={confirmInputHandler}
            onChangeText={numberInputHandler}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.opposite}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
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
    alignItems: 'center',
  },
  input: {
    width: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
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
  outputText: {},
});

export default StartGameScreen;
