import { db } from '@/utils/FirebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, Timestamp } from 'firebase/firestore/lite';
import { createContext, useState } from 'react';
interface Chat {
    id: string;
    firstMessage: string;
    date: Date;
}
interface ChatContextProps {
    createConversation: () => Promise<string>;
    getConversation: (conversationId: string) => Promise<any>;
    fetchChats: () => Promise<any>;
    chats: Chat[];
    setChats: (chats: Chat[]) => void;
    clearConversations: () => Promise<any>;
}

export const ChatContext = createContext({} as ChatContextProps);

export const ChatProvider = ({ children }:any)=> {
            //const createConversation
        const createConversation = async () => {
            try {
                const newConversationRef = await addDoc(collection(db, 'Conversations'), {
                    Messages: [],
                    date: new Date(),
                    key: Date.now().toString()
                });

                return newConversationRef.id;
            } catch (err) {
                console.error(err);
                return '';
            }
        }

        //const fetchMessages -> getElementById
            const getConversation = async (conversationId: string) => {
                try {
                    const conversationRef = doc(db, 'Conversations', conversationId);
                    const conversationSnap = await getDoc(conversationRef);
                    
                    if (conversationSnap.exists()) {
                        const data = conversationSnap.data();
                        const formattedMessages = data.Messages.map((msg: any) => ({
                            ...msg,
                            date: msg.date instanceof Timestamp ? msg.date.toDate() : new Date(msg.date)
                        })); 
                        return formattedMessages;
                    }
                } catch (err) {
                    console.error(err);
                }
            }
                    
        //const fetchChats -> getAllElements
        const [chats, setChats] = useState<Chat[]>([]);
            const fetchChats = async () => {
                try {
                    const chatsSnapshot = await getDocs(collection(db, 'Conversations'));
                    const chatsMap = new Map<string, Chat>();
                    
                    chatsSnapshot.docs.forEach(doc => {
                        const data = doc.data();
                        const chatId = doc.id;
                        if (data.Messages && data.Messages.length > 0) {
                            const firstMessage = data.Messages[0].text.split(' ').slice(0, 5).join(' ');
                            chatsMap.set(chatId, {
                            id: chatId,
                            firstMessage: firstMessage,
                            date: data.date instanceof Timestamp ? data.date.toDate() : new Date()
                                });
                            }
                    });

                    setChats(Array.from(chatsMap.values()));

                } catch (err) {
                    console.error(err);
                }
            }

        //const clearConversations -> deleteAllElements
        const clearConversations = async () => {
                try {
                    const chatsSnapshot = await getDocs(collection(db, 'Conversations'));
                    const deletePromises = chatsSnapshot.docs.map(docSnap => deleteDoc(doc(db, 'Conversations', docSnap.id)));
                    await Promise.all(deletePromises);
                    setChats([]); // Limpiar la lista en el estado
                } catch (error) {
                    console.error("Error al eliminar conversaciones: ", error);
                }
            };


    return <ChatContext.Provider 
    value={{
        createConversation,
        getConversation, 
        fetchChats,
        chats,
        setChats,
        clearConversations
    }}
    >{children}</ChatContext.Provider>
}