import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bio: '',
        profilePic: null,
    });

    const [errors, setErrors] = useState({});
    const [lastSessionTime, setLastSessionTime] = useState('');

    useEffect(() => {
        (async () => {
            const time = await AsyncStorage.getItem('lastSessionTime');
            if (time) {
                const formattedTime = formatTime(parseInt(time, 10));
                setLastSessionTime(`Last Session Time: ${formattedTime}`);
            }
        })();
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const handleRegister = () => {
        if (validateForm()) {
            AsyncStorage.setItem('userData', JSON.stringify(form))
                .then(() => {
                    navigation.navigate('Main');
                })
                .catch((error) => {
                    console.error('Error saving user data:', error);
                });
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setForm({ ...form, profilePic: result.assets[0].uri });
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setForm({ ...form, profilePic: result.assets[0].uri });
        }
    };

    const chooseImageSource = () => {
        Alert.alert(
            'Profile Picture',
            'Choose an option',
            [
                { text: 'Take Photo', onPress: takePhoto },
                { text: 'Choose from Gallery', onPress: pickImage },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const validateForm = () => {
        let newErrors = {};

        if (!form.firstName) newErrors.firstName = 'First name is required.';
        if (!form.lastName) newErrors.lastName = 'Last name is required.';
        if (!form.email) newErrors.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format.';

        if (!form.password) newErrors.password = 'Password is required.';
        else if (form.password.length < 6 || !/[!@#$%^&*]/.test(form.password)) {
            newErrors.password = 'Password must be at least 6 characters long and include a special character.';
        }

        if (!form.bio) newErrors.bio = 'Bio is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <ImageBackground
            source={require('./background.jpg')}
            style={styles.backgroundImage}
            blurRadius={10}
        >
            <View style={styles.container}>
                {lastSessionTime && (
                    <View style={styles.lastSessionContainer}>
                        <Text style={styles.lastSessionTime}>{lastSessionTime}</Text>
                    </View>
                )}

                <View style={styles.avatarContainer}>
                    <Image source={form.profilePic ? { uri: form.profilePic } : require('./default-avatar.png')} style={styles.avatar} />
                    <TouchableOpacity onPress={chooseImageSource} style={styles.addPhotoButton}>
                        <Ionicons name="camera" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="First Name"
                    style={styles.input}
                    onChangeText={(text) => handleInputChange('firstName', text)}
                    placeholderTextColor="#999"
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                <TextInput
                    placeholder="Last Name"
                    style={styles.input}
                    onChangeText={(text) => handleInputChange('lastName', text)}
                    placeholderTextColor="#999"
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    keyboardType="email-address"
                    onChangeText={(text) => handleInputChange('email', text)}
                    placeholderTextColor="#999"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholderTextColor="#999"
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <TextInput
                    placeholder="Brief Bio"
                    style={[styles.input, styles.bioInput]}
                    onChangeText={(text) => handleInputChange('bio', text)}
                    placeholderTextColor="#999"

                />
                {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    lastSessionContainer: {
        backgroundColor: 'rgba(0, 123, 255, 0.8)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    lastSessionTime: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#fff',
    },
    addPhotoButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007BFF',
        borderRadius: 20,
        padding: 5,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginVertical: 10,
        fontSize: 16,
        color: '#333',
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    registerButton: {
        backgroundColor: '#007BFF',
        borderRadius: 25,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: 15,
    },
});