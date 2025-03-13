import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import UI from '../../lib/ui';  // Importing the UI component from libs/ui.tsx

const Index: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {/* Render the UI component */}
      <UI />
    </SafeAreaView>
  );
};

export default Index;
