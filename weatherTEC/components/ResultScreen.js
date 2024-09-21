import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const API_KEY = '7ZYLMSL4D3RHYX7C';  // Clave API de ThingSpeak
const BASE_URL = 'https://api.thingspeak.com/channels/2663975/feeds.json';

export default function ResultsScreen() {
  // Fechas quemadas para pruebas
  const startDate = '2024-09-20';
  const endDate = '2024-09-21';

  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [maxHum, setMaxHum] = useState(0);
  const [minHum, setMinHum] = useState(0);

  // Función para obtener datos de ThingSpeak y agruparlos por hora
  // Función para obtener datos de ThingSpeak y agruparlos por hora
const fetchData = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: API_KEY,
        start: `${startDate} 00:00:00`,
        end: `${endDate} 23:59:59`,
      },
    });

    const feeds = response.data.feeds || [];
    console.log('Feeds:', feeds);

    if (feeds.length > 0) {
      // Variables para almacenar los máximos y mínimos reales
      let tempMax = -Infinity;
      let tempMin = Infinity;
      let humMax = -Infinity;
      let humMin = Infinity;

      // Agrupar los datos por hora
      const groupedData = feeds.reduce((acc, feed) => {
        const createdAt = new Date(feed.created_at);
        const hour = `${createdAt.getFullYear()}-${String(
          createdAt.getMonth() + 1
        ).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')} ${String(
          createdAt.getHours()
        ).padStart(2, '0')}:00`;

        const temp = feed.field1 ? parseFloat(feed.field1) : 0;
        const hum = feed.field2 ? parseFloat(feed.field2) : 0;

        // Actualizar máximos y mínimos globales antes de agrupar
        tempMax = Math.max(tempMax, temp);
        tempMin = Math.min(tempMin, temp);
        humMax = Math.max(humMax, hum);
        humMin = Math.min(humMin, hum);

        if (!acc[hour]) {
          acc[hour] = { tempSum: 0, humSum: 0, count: 0 };
        }

        acc[hour].tempSum += temp;
        acc[hour].humSum += hum;
        acc[hour].count += 1;

        return acc;
      }, {});

      // Calcular el promedio por cada hora y generar etiquetas de hora
      const tempData = [];
      const humData = [];
      const labels = [];

      Object.keys(groupedData).forEach((hour) => {
        const { tempSum, humSum, count } = groupedData[hour];
        const avgTemp = tempSum / count;
        const avgHum = humSum / count;
        tempData.push(avgTemp);  // Promedio de temperatura por hora
        humData.push(avgHum);    // Promedio de humedad por hora
      });

      // Actualizar los estados con los datos agrupados por hora
      setTemperatureData(tempData);
      setHumidityData(humData);
      setDateLabels(labels);

      // Establecer máximos y mínimos globales calculados
      setMaxTemp(tempMax);
      setMinTemp(tempMin);
      setMaxHum(humMax);
      setMinHum(humMin);

    } else {
      setTemperatureData([]);
      setHumidityData([]);
      setDateLabels([]);
      setMaxTemp(0);
      setMinTemp(0);
      setMaxHum(0);
      setMinHum(0);
    }

    setLoading(false); // Deshabilitar el indicador de carga
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
};


  useEffect(() => {
    fetchData();
  }, []); // Solo se ejecuta una vez ya que usamos fechas quemadas

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  // Gráfico de Temperatura
  const temperatureChartData = {
    labels: dateLabels, // Etiquetas de horas
    datasets: [
      {
        data: temperatureData,
        color: () => "#FF6347", // Rojo para la temperatura
        strokeWidth: 2,
      },
    ],
  };

  // Gráfico de Humedad
  const humidityChartData = {
    labels: dateLabels, // Etiquetas de horas
    datasets: [
      {
        data: humidityData,
        color: () => "#1E90FF", // Azul para la humedad
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView>
      <View>
        <Text>Gráfico de Temperatura (Promedio por Hora)</Text>
        <LineChart
          data={temperatureChartData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      </View>

      <View>
        <Text>Gráfico de Humedad (Promedio por Hora)</Text>
        <LineChart
          data={humidityChartData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      </View>

      {/* Mostrar la temperatura y humedad máxima y mínima */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Temperatura Máxima Histórica: {maxTemp+'°C'}</Text>
        <Text style={styles.infoText}>Temperatura Mínima Histórica: {minTemp+'°C'}</Text>
        <Text style={styles.infoText}>Humedad Máxima Histórica: {maxHum+'%'}</Text>
        <Text style={styles.infoText}>Humedad Mínima Histórica: {minHum+'%'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = {
  infoContainer: {
    backgroundColor: '#E0F7FA', // Fondo igual al de HomeScreen
    padding: 20, // Relleno interno para separar el texto de los bordes
    borderRadius: 10, // Borde redondeado
    marginVertical: 10, // Margen vertical entre otros elementos
    alignItems: 'center', // Centra los textos horizontalmente
  },
  infoText: {
    color: '#000', // Texto en color negro
    fontSize: 16, // Tamaño de la fuente
    marginBottom: 5, // Espacio entre los textos
  },
};