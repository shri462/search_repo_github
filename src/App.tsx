/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from './constants/colors';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import Dashboard from './screens/Dashboard';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: colors,
};

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
        <Dashboard />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
