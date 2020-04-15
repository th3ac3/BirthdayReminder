import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import AppContent from './AppContent';

const App = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <AppContent />
      </ScrollView>
    </SafeAreaView>
  </>
);

export default App;
