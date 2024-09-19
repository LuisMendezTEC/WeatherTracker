import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './components/HomeScreen'; // Pantalla de Inicio
import StartScreen from './components/StartScreen'; // Pantalla intermedia con Header

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Pantalla de Inicio */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Ocultamos el header predeterminado en Home
        />
        {/* Pantalla Start que contiene el Header */}
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ title: 'Start Screen' }} // Barra de navegación con botón de volver
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
