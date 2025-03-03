import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Splashscreen() {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../assets/images/chatgpt-logo.png')} // Asegúrate de tener la imagen en la carpeta correcta
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.logoText}>ChatGPT</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E2E38', // Color oscuro de fondo
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        borderWidth: 0,
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    labelTopLeft: {
        top: '20%',
        left: '5%',
    },
    labelTopRight: {
        top: '20%',
        right: '5%',
    },
    labelCenter: {
        top: '50%',
        left: '50%',
        transform: [{ translateX: -40 }], // Centrar correctamente
        backgroundColor: 'green',
    },
});

