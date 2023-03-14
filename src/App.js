import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { Button, Dimensions, StatusBar } from 'react-native';
import Input from './components/input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import MyButton from './components/MyButton';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  aline-items: center;
  justify-content: flex-start;
`;
const Title = styled.Text`
  font-size: 60px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: center;
  justify-self: ;
  margin: 40px 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default function App() {
  const width = Dimensions.get('window').width;
  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});

  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };

    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject });
    _saveTasks({ ...tasks, ...newTaskObject });
  };

  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
    _saveTasks(currentTasks);
  };

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
    _saveTasks(currentTasks);
  };

  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    setTasks(currentTasks);
    _saveTasks(currentTasks);
  };

  const _deleteSelectedTasks = () => {
    const currentTasks = Object.assign({}, tasks);
    Object.values(currentTasks).forEach(item => {
      if (item.completed) {
        delete currentTasks[item.id];
      }
    });
    setTasks(currentTasks);
    _saveTasks(currentTasks);
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };

  const _onBlur = () => {
    setNewTask('');
  };

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>버킷 리스트</Title>
        <Input
          placeholder="   +항목추가"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
          <MyButton onPress={_deleteSelectedTasks} title="선 택 항 목 삭 제" />
        </List>
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadTasks}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}
