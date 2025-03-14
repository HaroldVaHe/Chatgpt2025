# ChatGPT2025

## Descripción

Este es un proyecto de aplicación de chat en tiempo real desarrollado con **React Native**, **Expo Router**, **Firebase** y una integración con **Gemini API** para respuestas automáticas. La aplicación permite la autenticación de usuarios, la gestión de conversaciones y el almacenamiento de mensajes en Firestore.

## Tecnologías utilizadas

- **React Native** (Expo)
- **Firebase Firestore** (Base de datos)
- **Firebase Authentication** (Autenticación de usuarios)
- **Expo Router** (Navegación)
- **React Context API** (Manejo de estado global)
- **Gemini API** (Generación de respuestas automáticas)

## Instalación y configuración

### 1. Clonar el repositorio

```sh
 git clone https://github.com/HaroldVaHe/Chatgpt2025.git
 cd Chatgpt2025
```

### 2. Instalar dependencias

```sh
npm install
```

### 3. Configurar Firebase

1. Crear un proyecto en Firebase.
2. Habilitar **Authentication** con el proveedor de Google.
3. Crear una base de datos Firestore y una colección llamada `Conversations`.
4. Obtener el archivo `google-services.json` y colocarlo en `./android/app/`.
5. Configurar la clave de API de Firebase en un archivo de entorno `.env`:

```env
EXPO_PUBLIC_API_KEY_DB=TU_CLAVE_DE_API_FIREBASE
EXPO_PUBLIC_API_KEY=TU_CLAVE_DE_API_GEMINI
```

### 4. Iniciar la aplicación

```sh
npm run start
```

## Estructura del proyecto

```
app/
├── _layout.tsx  # Configuración de la navegación
├── index.tsx  # Pantalla de inicio (Login)
├── splashscreen.tsx  # Pantalla de carga inicial
├── chatScreen.tsx  # Pantalla del chat
├── dashboard.tsx  # Panel principal
context/
├── authContext/AuthContext.tsx  # Contexto de autenticación
├── chatContext/ChatContext.tsx  # Contexto del chat
interfaces/
├── AppInterfaces.ts  # Interfaces de los mensajes
├── Responses.ts  # Interfaces para la API
utils/
├── FirebaseConfig.ts  # Configuración de Firebase
```

## Funcionalidades principales

- **Inicio de sesión con Google**.
- **Gestión de conversaciones** con Firestore.
- **Mensajería en tiempo real**.
- **Generación de respuestas automáticas** con Gemini API.
- **Persistencia de datos en Firebase Firestore**.
- **Navegación entre pantallas** con Expo Router.

## API de Gemini

La aplicación utiliza la API de Gemini para generar respuestas automáticas en la conversación.

Ejemplo de solicitud a la API:

```ts
const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "contents": [{ "parts": [{ "text": mensajeUsuario }] }]
    })
});
```

## Autenticación con Firebase

Se implementa Firebase Authentication para la gestión de usuarios mediante Google.

Ejemplo de inicio de sesión:

```ts
const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error en el inicio de sesión", error);
    }
};
```

## Estado Global con Context API

Se utilizan los **AuthContext** y **ChatContext** para gestionar la autenticación y las conversaciones globalmente.

## Estilos y UI

La interfaz de usuario está diseñada con **React Native StyleSheet**, utilizando colores oscuros y una estructura simple para la experiencia de usuario.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, puedes hacer un **fork** y enviar un **pull request**.


