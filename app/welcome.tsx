import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Welcome() {
    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image source={require('../assets/images/chatgpt-logo.png')} style={styles.logo} />

            {/* Título */}
            <Text style={styles.title}>Welcome to ChatGPT</Text>
            <Text style={styles.subtitle}>Ask anything, get your answer</Text>

            {/* Icono de capacidades */}
            <Text style={styles.lightning}>⚡</Text>
            <Text style={styles.sectionTitle}>Capabilities</Text>

            {/* Lista de capacidades */}
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardText}>Remembers what user said earlier in the conversation</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardText}>Allows user to provide follow-up corrections</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardText}>Trained to decline inappropriate requests</Text>
                </View>
            </View>

            {/* Indicadores de paginación */}
            <View style={styles.pagination}>
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
            </View>

            {/* Botón "Next" */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262c36',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 30,
    },
    lightning: {
        fontSize: 24,
        color: '#fff',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    cardContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    card: {
        width: '100%',
        backgroundColor: '#3a3f4b',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: '#555',
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#18c37d',
    },
    button: {
        backgroundColor: '#18c37d',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
