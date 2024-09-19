import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Contenedor del encabezado con fondo blanco */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Home</Text>
      </View>

      <Image source={require('../images/windy2.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to WeatherTEC</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Start')}
      >
        <Text style={styles.buttonText}>Get Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Ajustado el margen superior para bajar el encabezado
  headerContainer: {
    position: 'absolute',
    top: 31, // Cambiado de 0 a 20 para bajar el encabezado
    left: 0,
    right: 0, // Hace que el fondo blanco recorra todo el ancho
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Cambiado a negro
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    color: '#01579B',
    marginBottom: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#0288D1',
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
