import { auth, db } from '@utils/FirebaseConfig';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createContext, useState } from 'react';

interface AuthContextProps {
   handleLogout: () => Promise<void>;
    handleLogin: () => Promise<void>;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    error: string;
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
                //const login -> signInWithEmailAndPassword function from firebase auth module
                  const router = useRouter();
                  const [email, setEmail] = useState("");
                  const [password, setPassword] = useState("");
                  const [error, setError] = useState("");
                  
                const handleLogin = async () => {
                    try {
                      setError(""); // Resetear error antes del intento de login
                      const response = await signInWithEmailAndPassword(auth, email, password);
                      console.log({ response: response.user });
                      if (response.user) {
                        router.push("/chatScreen");
                      }
                    } catch (error: any) {
                      console.log("Error Login: ", error.message);
                      setError("Correo o contraseña incorrectos"); // Mensaje de error amigable
                    }
                  };
        

    return <AuthContext.Provider 
    value={{
        handleLogout,
        handleLogin, 
        email, 
        setEmail, 
        password, 
        setPassword, 
        error
    }}
    >{children}</AuthContext.Provider>
}