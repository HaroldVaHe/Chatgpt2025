import { collection, getDocs, Timestamp } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Message } from '../interfaces/AppInterfaces';
import { db } from '../utils/FirebaseConfig';

interface Chat {
    id: string;
    firstMessage: string;
    date: Date;
}

export default function Dashboard() {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            const chatsSnapshot = await getDocs(collection(db, 'Conversations'));
            const chatsMap = new Map<string, Chat>();

            chatsSnapshot.docs.forEach(doc => {
                const data = doc.data() as Message;
                const chatId = doc.id; // Asumiendo que cada documento tiene un ID único

                if (!chatsMap.has(chatId)) {
                    chatsMap.set(chatId, {
                        id: chatId,
                        firstMessage: data.text,
                        date: data.date instanceof Timestamp ? data.date.toDate() : new Date()
                    });
                }
            });

            setChats(Array.from(chatsMap.values()));
        };

        fetchChats();
    }, []);

    const isValidDate = (date: any) => {
        return date instanceof Date && !isNaN(date.getTime());
    };

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

            {/* Historial de conversaciones */}
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.chatItem}>
                        <Text style={styles.chatText}>{item.firstMessage}</Text>
                        <Text style={styles.chatDate}>{isValidDate(item.date) ? item.date.toISOString() : 'Invalid Date'}</Text>
                    </View>
                )}
            />

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
    chatItem: {
        backgroundColor: '#2C2C3A',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    chatText: {
        color: 'white',
        fontSize: 16,
    },
    chatDate: {
        color: '#888',
        fontSize: 12,
        marginTop: 5,
    },
});