import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        profilePic: null,
        backgroundPic: null,
    });

    const [isBioModalVisible, setIsBioModalVisible] = useState(false);
    const [tempBio, setTempBio] = useState('');

    useEffect(() => {
        (async () => {
            const data = await AsyncStorage.getItem('userData');
            if (data) {
                const parsedData = JSON.parse(data);
                setUserData(parsedData);
                setTempBio(parsedData.bio);
            }
        })();
    }, []);

    const saveBio = async () => {
        try {
            const updatedData = { ...userData, bio: tempBio };
            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
            setUserData(updatedData);
            setIsBioModalVisible(false);
            Alert.alert('Success', 'Bio updated successfully!');
        } catch (error) {
            console.error('Error saving bio:', error);
            Alert.alert('Error', 'Failed to update bio.');
        }
    };

    const pickImage = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const updatedData = { ...userData, [type]: result.assets[0].uri };
            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
            setUserData(updatedData);
        }
    };

    const takePhoto = async (type) => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const updatedData = { ...userData, [type]: result.assets[0].uri };
            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
            setUserData(updatedData);
        }
    };

    const chooseImageSource = (type) => {
        Alert.alert(
            `Change ${type === 'profilePic' ? 'Profile Picture' : 'Background Picture'}`,
            'Choose an option',
            [
                { text: 'Take Photo', onPress: () => takePhoto(type) },
                { text: 'Choose from Gallery', onPress: () => pickImage(type) },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const signOut = async () => {
        try {
            const sessionTime = await AsyncStorage.getItem('sessionTime');
            if (sessionTime) {
                await AsyncStorage.setItem('lastSessionTime', sessionTime);
            } else {
                await AsyncStorage.removeItem('lastSessionTime');
            }
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('sessionTime');
            navigation.navigate('Register');
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={userData.backgroundPic ? { uri: userData.backgroundPic } : require('./background.jpg')} style={styles.backgroundImage} />
            <TouchableOpacity onPress={() => chooseImageSource('backgroundPic')} style={styles.changeBackgroundButton}>
                <Ionicons name="camera" size={20} color="#fff" />
                <Text style={styles.changeBackgroundButtonText}>Change Background</Text>
            </TouchableOpacity>

            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={() => chooseImageSource('profilePic')} style={styles.avatarContainer}>
                    <Image source={userData.profilePic ? { uri: userData.profilePic } : require('./default-avatar.png')} style={styles.avatar} />
                    <Ionicons name="camera" size={24} color="#fff" style={styles.cameraIcon} />
                </TouchableOpacity>

                <Text style={styles.name}>{userData.firstName} {userData.lastName}</Text>
                <Text style={styles.email}>{userData.email}</Text>

                <TouchableOpacity onPress={() => setIsBioModalVisible(true)} style={styles.bioContainer}>
                    <Text style={styles.bioTitle}>About Me</Text>
                    <Text style={styles.bioText}>{userData.bio || 'No bio yet.'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
                    <Ionicons name="log-out" size={24} color="#fff" />
                    <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            {/* Modal para editar la biografía */}
            <Modal visible={isBioModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Bio</Text>
                        <TextInput
                            placeholder="Enter your bio"
                            value={tempBio}
                            onChangeText={setTempBio}
                            style={styles.modalInput}
                            multiline
                        />
                        <TouchableOpacity style={styles.modalSaveButton} onPress={saveBio}>
                            <Text style={styles.modalSaveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCancelButton} onPress={() => setIsBioModalVisible(false)}>
                            <Text style={styles.modalCancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    backgroundImage: {
        width: '100%',
        height: 200,
        position: 'absolute',
        top: 0,
    },
    changeBackgroundButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    changeBackgroundButtonText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5,
    },
    profileContainer: {
        marginTop: 150,
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#fff',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007BFF',
        borderRadius: 15,
        padding: 5,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    bioContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    bioTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    bioText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dc3545',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    signOutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    modalSaveButton: {
        backgroundColor: '#007BFF',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    modalSaveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalCancelButton: {
        backgroundColor: '#dc3545',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
    },
    modalCancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});