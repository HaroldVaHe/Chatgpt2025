import { auth } from "@/utils/FirebaseConfig";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button } from "react-native";

export default function Login() {

const router = useRouter();
const [email, setEmail] = useState("hans@test.com");
const [password, setPassword] = useState("123456");

const login = async () => {
    try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log({
        response: response.user
    })
    if (response.user) {
        router.push("/chatScreen");
    }
    } catch (error) {
    console.log("Error Login: ", { error })
    }
}

return (

    <Button
        title="Login"
        onPress={login}
    />
);
}