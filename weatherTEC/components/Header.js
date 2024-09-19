import { DateTimePicker } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Header = ({ onConsult }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTemperature, setShowTemperature] = useState(false);
  const [showHumidity, setShowHumidity] = useState(false);
  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');

  const handleConsult = () => {
    onConsult({ startDate, endDate, showTemperature, showHumidity });
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
            thumbColor={showTemperature ? '#4DB6AC' : '#B0BEC5'}
            trackColor={{ false: '#B0BEC5', true: '#80CBC4' }}
          />
        </View>
        <View style={styles.switchOption}>
          <Text style={styles.switchText}>Humidity</Text>
          <Switch
            value={showHumidity}
            onValueChange={() => setShowHumidity((prev) => !prev)}
            thumbColor={showHumidity ? '#4DB6AC' : '#B0BEC5'}
            trackColor={{ false: '#B0BEC5', true: '#80CBC4' }}
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
    padding: 15,
    backgroundColor: '#E0F7FA', // Fondo azul claro
    width: '100%',
    flex: 1, // Para ocupar todo el espacio disponible
    position: 'absolute',
    top: 0,
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#01579B',
    textAlign: 'left',
  },
  dateLabel: {
    fontSize: 14,
    color: '#01579B',
    marginVertical: 5,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 5,
    padding: 10,
    width: '30%',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#0288D1',
    marginVertical: 5,
    textAlign: 'left',
  },
  switchContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 10,
  },
  switchOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  switchText: {
    fontSize: 14,
    color: '#01579B',
    marginRight: 10,
  },
  consultButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Header;
