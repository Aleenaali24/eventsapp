import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { signUp } from "../../lib/supabase_crud"; // Importing Sign-up Function

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Function to Handle Registration
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert("Success", "Account created! Please log in.");
      router.replace("/(auth)/login");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Registration Error", error.message);
      } else {
        Alert.alert("Registration Error", "An unknown error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Email" 
          placeholderTextColor="#888" 
          value={email} 
          onChangeText={setEmail} 
          style={styles.input} 
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Password" 
          placeholderTextColor="#888" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Confirm Password" 
          placeholderTextColor="#888" 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
          secureTextEntry 
          style={styles.input} 
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Already have an account? 
        <Text style={styles.registerLink} onPress={() => router.push("/(auth)/login")}> Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  registerLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
