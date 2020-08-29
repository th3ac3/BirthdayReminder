import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BirthdayList from './BirthdayList';

enum Routes {
  BirthdayList = 'Birthday List',
}

const Stack = createStackNavigator();
const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={Routes.BirthdayList}>
      <Stack.Screen name={Routes.BirthdayList} component={BirthdayList} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
