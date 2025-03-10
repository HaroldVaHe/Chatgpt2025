import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./FirebaseConfig"; // Asegúrate de que la ruta sea correcta

export interface Conversation {
  title: string;
  messages: string[];
  create_at: Timestamp;
}

const saveConversation = async (messages: string[]): Promise<any> => {
  try {
    const title = messages.length > 0 ? messages[0] : "Nueva Conversación"; // Usar el primer mensaje como título o un título por defecto
    const newConversation: Conversation = {
      title,
      messages,
      create_at: Timestamp.now(),
    };
    const docRef = await addDoc(collection(db, "conversations"), newConversation);
    return docRef;
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
};

export { saveConversation };