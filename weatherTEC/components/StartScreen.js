import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header'; // Importamos el Header

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Aquí se renderiza directamente el Header */}
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
