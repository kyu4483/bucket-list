import React from 'react';
import { Button } from 'react-native';

const MyButton = ({ onPress, title }) => {
  return <Button onPress={onPress} title={title} color="green" />;
};

export default MyButton;
