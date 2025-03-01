import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [sessionTime, setSessionTime] = useState(0);

    useEffect(() => {
        let interval;

        const startSessionTimer = async () => {
            interval = setInterval(() => {
                setSessionTime((prev) => prev + 1);
            }, 1000);

            const saveSessionTime = async () => {
                await AsyncStorage.setItem('sessionTime', sessionTime.toString());
            };

            saveSessionTime();
        };

        startSessionTimer();

        return () => {
            clearInterval(interval);
        };
    }, [sessionTime]);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location access is required for weather information.');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=28c206682b570a3e0fd34d6aa4bd67a8&units=metric`
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                Alert.alert('Error', 'Failed to fetch weather data.');
            }
        })();
    }, []);

    const shareLocation = () => {
        if (location) {
            const url = `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
            Alert.alert('Share Location', `Share your location: ${url}`);
        } else {
            Alert.alert('Error', 'Location not available.');
        }
    };


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./background.jpg')}
                style={styles.backgroundImage}
                blurRadius={10}
            >
                {weather && weather.main ? (
                    <View style={styles.contentContainer}>
                        <View style={styles.weatherContainer}>
                            <Text style={styles.weatherText}>
                                <Ionicons name="thermometer" size={24} color="#fff" /> {weather.main.temp}°C
                            </Text>
                            <Text style={styles.weatherText}>
                                <Ionicons name="cloud" size={24} color="#fff" /> {weather.weather[0].description}
                            </Text>
                            <Text style={styles.weatherText}>
                                <Ionicons name="location" size={24} color="#fff" /> {weather.name}, {weather.sys.country}
                            </Text>
                        </View>

                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    }}
                                />
                            </MapView>
                        </View>

                        <Text style={styles.sessionTimeText}>
                            <Ionicons name="time" size={24} color="#fff" /> Session Time: {formatTime(sessionTime)}
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={shareLocation}>
                                <Ionicons name="share-social" size={24} color="#fff" />
                                <Text style={styles.buttonText}>Share Location</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                ) : (
                    <Text style={styles.loadingText}>Loading weather data...</Text>
                )}
            </ImageBackground>
        </View>
    );
}

const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    weatherContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        width: '90%',
        alignItems: 'center',
    },
    weatherText: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
    },
    mapContainer: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    sessionTimeText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
    },
    button: {
        backgroundColor: 'rgba(0, 123, 255, 0.8)',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    loadingText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
});