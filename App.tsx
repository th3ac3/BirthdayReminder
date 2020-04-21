import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppContent from './src/AppContent';

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
});

const App = () => (
  <>
    <StatusBar barStyle="light-content" />
    <SafeAreaView style={styles.safeAreaView}>
      <AppContent />
    </SafeAreaView>
  </>
);

export default App;
