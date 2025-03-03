import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Dashboard() {
    return (
        <View style={styles.container}>
            {/* Nueva conversación */}
            <TouchableOpacity style={styles.option}>
                <Icon name="message-square" size={18} color="#fff" />
                <Text style={styles.optionText}>New Chat</Text>
                <Icon name="chevron-right" size={18} color="#fff" style={styles.arrow} />
            </TouchableOpacity>

            {/* Separador */}
            <View style={styles.separator} />

            {/* Opciones */}
            <TouchableOpacity style={styles.option}>
                <Icon name="trash-2" size={18} color="#fff" />
                <Text style={styles.optionText}>Clear conversations</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <Icon name="user-plus" size={18} color="#fff" />
                <Text style={styles.optionText}>Upgrade to Plus</Text>
                <View style={styles.newBadge}>
                    <Text style={styles.newText}>NEW</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <Icon name="sun" size={18} color="#fff" />
                <Text style={styles.optionText}>Light mode</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <Icon name="external-link" size={18} color="#fff" />
                <Text style={styles.optionText}>Updates & FAQ</Text>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity style={styles.logout}>
                <Icon name="log-out" size={18} color="#f44336" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    optionText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
        flex: 1,
    },
    arrow: {
        opacity: 0.5,
    },
    separator: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 10,
    },
    newBadge: {
        backgroundColor: '#FFD700',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
        marginLeft: 8,
    },
    newText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginTop: 10,
    },
    logoutText: {
        fontSize: 16,
        color: '#f44336',
        marginLeft: 10,
    },
});
