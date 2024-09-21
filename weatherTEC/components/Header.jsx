import { DateTimePicker } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Header = () => {
  const navigation = useNavigation(); // Obtener el objeto de navegación
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTemperature, setShowTemperature] = useState(false);
  const [showHumidity, setShowHumidity] = useState(false);
  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');

  const handleConsult = () => {
    // Navegar a ResultsScreen con los datos ingresados
    navigation.navigate('Results', {
      startDate: startDateInput,
      endDate: endDateInput,
      showTemperature,
      showHumidity,
    });
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Select date</Text>

      <Text style={styles.dateLabel}>Start:</Text>
      <TextInput
        style={styles.dateInput}
        placeholder="Initial date"
        value={startDateInput}
        onChangeText={(text) => setStartDateInput(text)}
        placeholderTextColor="#90A4AE"
      />
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.dateText}>{startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartDatePicker(false);
            if (date) {
              setStartDate(date);
              setStartDateInput(date.toLocaleDateString());
            }
          }}
        />
      )}

      <Text style={styles.dateLabel}>End:</Text>
      <TextInput
        style={styles.dateInput}
        placeholder="End date"
        value={endDateInput}
        onChangeText={(text) => setEndDateInput(text)}
        placeholderTextColor="#90A4AE"
      />
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.dateText}>{endDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndDatePicker(false);
            if (date) {
              setEndDate(date);
              setEndDateInput(date.toLocaleDateString());
            }
          }}
        />
      )}

      <Text style={styles.headerTitle}>Options</Text>
      <View style={styles.switchContainer}>
        <View style={styles.switchOption}>
          <Text style={styles.switchText}>Temperature</Text>
          <Switch
            value={showTemperature}
            onValueChange={() => setShowTemperature((prev) => !prev)}
            thumbColor={showTemperature ? '#42A5F5' : '#CFD8DC'}
            trackColor={{ false: '#CFD8DC', true: '#B3E5FC' }}
          />
        </View>
        <View style={styles.switchOption}>
          <Text style={styles.switchText}>Humidity</Text>
          <Switch
            value={showHumidity}
            onValueChange={() => setShowHumidity((prev) => !prev)}
            thumbColor={showHumidity ? '#42A5F5' : '#CFD8DC'}
            trackColor={{ false: '#CFD8DC', true: '#B3E5FC' }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.consultButton} onPress={handleConsult}>
        <Text style={styles.buttonText}>Consult</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: '#E0F7FA', // Fondo igual al de HomeScreen
    width: '100%',
    flex: 1,
    position: 'absolute',
    top: 0,
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#37474F', // Azul oscuro-grisáceo
    textAlign: 'left',
  },
  dateLabel: {
    fontSize: 16,
    color: '#37474F', 
    marginVertical: 5,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#CFD8DC', // Gris claro
    borderRadius: 5,
    padding: 10,
    width: '30%',
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // Blanco
  },
  dateText: {
    fontSize: 16,
    color: '#42A5F5', // Azul suave
    marginVertical: 5,
    textAlign: 'left',
  },
  switchContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 15,
  },
  switchOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  switchText: {
    fontSize: 16,
    color: '#37474F',
    marginRight: 10,
  },
  consultButton: {
    backgroundColor: '#42A5F5', // Azul suave
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFF', 
    fontSize: 18,
  },
});

export default Header;
