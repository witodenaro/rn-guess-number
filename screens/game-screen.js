import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
  return (
    <View>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GameScreen;
