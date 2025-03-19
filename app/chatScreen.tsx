import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Message } from '../interfaces/AppInterfaces';
import { APIResponse } from '../interfaces/Responses';
import { db } from '../utils/FirebaseConfig';
import { router } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { ChatContext } from '../context/chatContext/ChatContext';

export default function ChatScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { chatId } = route.params as { chatId: string };
    const [conversationId, setConversationId] = useState<string | null>(chatId);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState('');
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const {createConversation , getConversation} = useContext(ChatContext);


    useEffect(() => {
        const fetchMessages = async () => {
            if (!conversationId) {
                try {
                   const response = await createConversation();
                    
                    // IMPORTANTE: Esperar a que se actualice el estado antes de continuar
                    setConversationId(response);
                    return; // Salir para que el efecto se vuelva a ejecutar con el nuevo conversationId
                } catch (err) {
                    setError("Error al crear la conversación.");
                    console.error(err);
                }
            } else {
                try {
                    const conversation = await getConversation(conversationId);
                    
                        setMessages(conversation);
                    }
                 catch (err) {
                    setError("Error al obtener mensajes.");
                    console.error(err);
                }
            }
        };
    
        fetchMessages();
    }, [conversationId]); // Se ejecuta cuando conversationId cambia

    const sendMessage = async () => {
        if (!message.trim() || !conversationId) return;

        const newMessage: Message = {
            text: message,
            sender_by: 'Me',
            date: new Date(),
            key: Date.now().toString()
        }; 
        try {
            const conversationRef = doc(db, 'Conversations', conversationId);
            const conversationSnap = await getDoc(conversationRef);

            if (conversationSnap.exists()) {
                const data = conversationSnap.data();
                const updatedMessages = [...data.Messages, newMessage];

                await updateDoc(conversationRef, { Messages: updatedMessages });

                setMessages(updatedMessages);
            } else {
                setError("No se encontró la conversación.");
            }
        } catch (err) {
            setError("Error al enviar el mensaje.");
            console.error(err);
        }

        setMessage('');
    };

    const getResponse = async () => {  
        if (!message.trim() || !conversationId) return;
        
        const newMessage: Message = { text: message, sender_by: 'Me', date: new Date(), key: Date.now().toString() };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessage('');
        setIsLoading(true);
        setError('');

        try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "contents": [{ "parts": [{ "text": newMessage.text }] }]
                })
            });

            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            
            const data: APIResponse = await response.json();
            const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
            const botMessage: Message = { text: botText, sender_by: 'Bot', date: new Date(), key: Date.now().toString() };

            setMessages(prevMessages => [...prevMessages, botMessage]);

            // Almacenar mensajes en Firestore
            const conversationRef = doc(db, 'Conversations', conversationId);
            const conversationSnap = await getDoc(conversationRef);

            if (conversationSnap.exists()) {
                const data = conversationSnap.data();
                const updatedMessages = [...data.Messages, newMessage, botMessage];

                await updateDoc(conversationRef, { Messages: updatedMessages });
            } else {
                setError("No se encontró la conversación.");
            }
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
                <TouchableOpacity onPress={() => router.push("/dashboard")}>
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Icon name="send" size={24} color="white" />
            </View>

            {/* Lista de mensajes */}
            <FlatList
                data={messages}
                keyExtractor={(item, index) => item.text + index}
                renderItem={({ item }) => (
                    <View style={item.sender_by === 'Me' ? styles.userMessage : styles.botMessage}>
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

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        textAlign: 'center',
        marginVertical: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
});

