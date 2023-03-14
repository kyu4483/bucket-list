import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  justify-content: center;
  height: 100px;
  margin: 3px 40px;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 50px;
  color: ${({ theme }) => theme.text};
`;

const Input = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
}) => {
  const width = Dimensions.get('window').width;

  return (
    <StyledTextInput
      width={width}
      placeholder={placeholder}
      maxLength={30}
      autiCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      KeyboardAppearance="dark"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const width = Dimensions.get('window').width;

export default Input;
