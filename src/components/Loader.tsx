import React from 'react';
import {colors} from '../constants/colors';
import {ActivityIndicator} from 'react-native-paper';

const Loader = () => {
  return (
    <ActivityIndicator
      style={{marginTop: 24}}
      animating={true}
      color={colors.secondary}
    />
  );
};

export default Loader;
