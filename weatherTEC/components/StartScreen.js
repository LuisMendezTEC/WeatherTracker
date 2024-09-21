import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header';

export default function StartScreen({ navigation }) {
  const handleConsult = (params) => {
    // Navegar a la pantalla de resultados pasando los parámetros seleccionados por el usuario
    navigation.navigate('Results', { ...params });
  };

  return (
    <View style={styles.container}>
      <Header onConsult={handleConsult} />
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
