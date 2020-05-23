import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppContent from './AppContent';

enum Routes {
  Home = 'Home',
}

const Stack = createStackNavigator();
const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={Routes.Home}>
      <Stack.Screen name={Routes.Home} component={AppContent} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
