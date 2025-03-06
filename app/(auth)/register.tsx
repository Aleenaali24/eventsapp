import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Enter your email" 
          placeholderTextColor="#888" 
          value={email} 
          onChangeText={setEmail} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Enter your password" 
          placeholderTextColor="#888" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Confirm your password" 
          placeholderTextColor="#888" 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
          secureTextEntry 
          style={styles.input} 
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => router.replace("/(tabs)")}>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
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
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    textAlign: "right",
    color: "#888",
    marginBottom: 20,
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
  orText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  socialIcon: {
    width: 24,
    height: 24,
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
