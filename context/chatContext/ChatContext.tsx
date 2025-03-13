import { db } from '@/utils/FirebaseConfig';
import { addDoc, collection, doc, getDoc, Timestamp } from 'firebase/firestore/lite';
import { createContext } from 'react';
interface ChatContextProps {
    createConversation: () => Promise<string>;
    getConversation: (conversationId: string) => Promise<any>;
    fetchChats: () => Promise<any>;
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
            const fetchChats = async () => {
                try {

                } catch (err) {
                    console.error(err);
                }
            }



    return <ChatContext.Provider 
    value={{
        createConversation,
        getConversation, 
        fetchChats,
    }}
    >{children}</ChatContext.Provider>
}