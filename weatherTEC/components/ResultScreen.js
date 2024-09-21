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
  
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [maxHum, setMaxHum] = useState(0);
  const [minHum, setMinHum] = useState(0);

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
// Después de calcular los datos de temperatura
setTemperatureData(tempData);
setHumidityData(humData);
setTimeLabels(labels);

  // Calcular el máximo y mínimo de temperatura y humedad
  const filteredTempData = tempData.filter(temp => temp > 0); // Filtrar temperaturas mayores a 0
  setMaxTemp(Math.max(...tempData));

  // Verificar si hay más de un valor en las temperaturas filtradas
  if (filteredTempData.length > 1) {
    setMinTemp(filteredTempData.sort((a, b) => a - b)[1]); // Obtener el segundo más bajo
  } else {
    setMinTemp(0); // Si solo hay un valor o ninguno, asignar 0
  }

  const fileteredHumData = humData.filter(hum => hum > 0); // Filtrar humedades mayores a 0
  setMaxHum(Math.max(...humData));
  if (fileteredHumData.length > 1) {
    setMinHum(fileteredHumData.sort((a, b) => a - b)[1]); // Obtener el segundo más bajo
  } else {
    setMinHum(0); // Si solo hay un valor o ninguno, asignar 0
  }

      } else {
        setTemperatureData([]);
        setHumidityData([]);
        setTimeLabels([]);
        setMaxTemp(0);
        setMinTemp(0);
        setMaxHum(0);
        setMinHum(0);
      }

      setLoading(false); // Deshabilitamos el indicador de carga
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
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
        <Text>Temperatura Máxima Historica: {maxTemp}</Text>
        <Text>Temperatura Mínima Historia: {minTemp}</Text>
        <Text>Humedad Máxima Historia: {maxHum}</Text>
        <Text>Humedad Mínima Historia: {minHum}</Text>
      </View>
    </ScrollView>
  );
}
