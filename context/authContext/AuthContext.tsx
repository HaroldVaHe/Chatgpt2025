import { auth, db } from '@/utils/FirebaseConfig';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, Timestamp } from 'firebase/firestore/lite';
import { createContext, useState } from 'react';

interface AuthContextProps {
   handleLogout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }:any)=> {
    
            //const handleLogout -> signOut function from firebase auth module
                const handleLogout = async () => {
                    try {
                        await signOut(auth);
                        router.replace("/");
                    } catch (error) {
                        console.error("Error al cerrar sesión: ", error);
                    }
                };
        

    return <AuthContext.Provider 
    value={{
        handleLogout
    }}
    >{children}</AuthContext.Provider>
}