import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header'; // Asegúrate de que la ruta sea correcta

export default function HomeScreen({ navigation }) {
    const [showHeader, setShowHeader] = useState(false);

    const handleConsult = (data) => {
        console.log(data);
    };

    return (
        <View style={styles.container}>
            {showHeader ? (
                <Header onConsult={handleConsult} />
            ) : (
                <>
                    <Image source={require('../images/windy2.png')} style={styles.logo} />
                    <Text style={styles.title}>Welcome to WeatherTEC</Text>

                    <TouchableOpacity style={styles.button} onPress={() => setShowHeader(true)}>
                        <Text style={styles.buttonText}>Get Start</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Fondo celeste claro
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    color: '#01579B', // Título en un azul suave
    marginBottom: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#0288D1', // Botones con azul celeste
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000', // Sombra para dar más efecto UX
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
