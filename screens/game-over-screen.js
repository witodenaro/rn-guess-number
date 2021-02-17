import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Card from '../components/card';
import OpenSansText from '../components/open-sans-text';
import MainButton from '../components/main-button';

import {resetGame} from '../redux/game/game.actions';
import {selectGuessAttemptsCount} from '../redux/game/game.selectors';
import {selectMythicNumberValue} from '../redux/mythic-number/mythic-number.selectors';
import COLORS from '../constants/colors';
import {changeMythicNumber} from '../redux/mythic-number/mythic-number.actions';

const GameOverScreen = () => {
  const dispatch = useDispatch();
  const mythicNumber = useSelector(selectMythicNumberValue);
  const attemptsCount = useSelector(selectGuessAttemptsCount);

  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  const restartHandler = () => {
    dispatch(changeMythicNumber(null));
    dispatch(resetGame());
  };

  return (
    <View style={styles.screen}>
      <Image
        source={require('../assets/success.png')}
        style={styles.backgroundImage}
      />
      <ScrollView>
        <Card
          style={{
            ...styles.results,
            marginTop: availableDeviceHeight > 600 ? 140 : 60,
          }}>
          <OpenSansText style={styles.resultText}>
            Your phone needed{' '}
            <OpenSansText style={styles.highlighted}>
              {attemptsCount}
            </OpenSansText>{' '}
            attempts to guess your number{' '}
            <OpenSansText style={styles.highlighted}>
              {mythicNumber}
            </OpenSansText>{' '}
          </OpenSansText>
        </Card>
        <MainButton
          opposite
          style={styles.restartButton}
          onPress={restartHandler}>
          Restart
        </MainButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  results: {
    marginHorizontal: 20,
    alignItems: 'center',
    maxWidth: 350,
  },
  backgroundImage: {width: '100%', height: '100%', position: 'absolute'},
  highlighted: {
    color: COLORS.secondary,
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
