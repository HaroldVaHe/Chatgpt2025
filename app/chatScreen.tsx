import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Message } from '../interfaces/AppInterfaces';
import { APIresponse } from '../interfaces/Responses';

export default function ChatScreen() {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState('');

    const getResponse = async () => {
        if (!message.trim()) return;
        
        const newMessage: Message = { text: message, senderby: 'Me', date: new Date() };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessage('');
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCZnhY405xJl-ZCNt9Af5V6QLGr4rFhfAM', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "contents": [{ "parts": [{ "text": newMessage.text }] }]
                })
            });

            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            
            const data: APIresponse = await response.json();
            const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
            const botMessage: Message = { text: botText, senderby: 'Bot', date: new Date() };

            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            setError('Hubo un error al obtener la respuesta.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Icon name="send" size={24} color="white" />
            </View>

            {/* Lista de mensajes */}
            <FlatList
                data={messages}
                keyExtractor={(item, index) => item.text + index}
                renderItem={({ item }) => (
                    <View style={item.senderby === 'Me' ? styles.userMessage : styles.botMessage}>
                        <Text style={styles.messageText}>{item.text}</Text>
                        <Text>{item.date.toISOString()}</Text>
                    </View>
                )}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
            />

            {/* Error */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Carga */}
            {isLoading && <ActivityIndicator size="large" color="#00C783" />}

            {/* Input con botón */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#888"
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={getResponse} disabled={isLoading}>
                    <Icon name="send" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#1E1E2C',
        padding: 10,
        justifyContent: 'space-between' as const,
    },
    header: {
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center' as const,
        paddingVertical: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#00C783',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#2C2C3A',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
    },
    messageText: {
        color: 'white',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center' as const,
        marginVertical: 5,
    },
    inputContainer: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        backgroundColor: '#2C2C3A',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        paddingVertical: 10,
    },
    sendButton: {
        backgroundColor: '#00C783',
        padding: 10,
        borderRadius: 20,
        marginLeft: 10,
    },
};
