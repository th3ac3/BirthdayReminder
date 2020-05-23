import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import StackNavigator from './src/StackNavigator';

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
});

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <StackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
