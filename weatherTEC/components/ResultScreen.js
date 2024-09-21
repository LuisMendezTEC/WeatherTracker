import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const API_KEY = '7ZYLMSL4D3RHYX7C';  // Clave API de ThingSpeak
const BASE_URL = 'https://api.thingspeak.com/channels/2663975/feeds.json';

export default function ResultsScreen({ route }) {
  const { startDate, endDate } = route.params;

  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [maxTemp, setMaxTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxHum, setMaxHum] = useState(null);
  const [minHum, setMinHum] = useState(null);

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

      // Agrupar los datos por la hora
      const groupedData = feeds.reduce((acc, feed) => {
        const date = new Date(feed.created_at);
        const hour = date.getHours();  // Extraer la hora

        if (!acc[hour]) {
          acc[hour] = { tempSum: 0, humSum: 0, count: 0 };
        }

        acc[hour].tempSum += feed.field1 ? parseFloat(feed.field1) : 0;
        acc[hour].humSum += feed.field2 ? parseFloat(feed.field2) : 0;
        acc[hour].count += 1;

        return acc;
      }, {});

      // Calcular el promedio por cada hora y generar etiquetas de tiempo
      const tempData = [];
      const humData = [];
      const labels = [];

      for (let hour = 0; hour < 24; hour++) {
        if (groupedData[hour]) {
          const { tempSum, humSum, count } = groupedData[hour];
          tempData.push(tempSum / count);  // Promedio de temperatura
          humData.push(humSum / count);    // Promedio de humedad
          labels.push(`${hour}:00`);       // Etiqueta de tiempo
        } else {
          tempData.push(0);                // Si no hay datos, 0 por defecto
          humData.push(0);
          labels.push(`${hour}:00`);
        }
      }

      setTemperatureData(tempData);
      setHumidityData(humData);
      setTimeLabels(labels);
      setMaxTemp(Math.max(...tempData));
      setMinTemp(Math.min(...tempData));
      setMaxHum(Math.max(...humData));
      setMinHum(Math.min(...humData));
      setLoading(false); // Deshabilitamos el indicador de carga
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]); // Asegúrate de que los datos se actualicen si las fechas cambian

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  // Gráfico de Temperatura
  const temperatureChartData = {
    labels: timeLabels, // Etiquetas de tiempo (hora)
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
    labels: timeLabels, // Etiquetas de tiempo (hora)
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
      <View>
        <Text>Temperatura Máxima: {maxTemp}</Text>
        <Text>Temperatura Mínima: {minTemp}</Text>
        <Text>Humedad Máxima: {maxHum}</Text>
        <Text>Humedad Mínima: {minHum}</Text>
      </View>
    </ScrollView>
  );
}
