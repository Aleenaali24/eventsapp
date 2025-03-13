import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signUp, signInWithLinkedIn } from '../../lib/supabase_auth';
import { useRouter } from 'expo-router';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    const result = await signUp(email, password);

    if (result.success) {
      Alert.alert('Success', 'Account created! Please check your email for verification.');
      router.push('/auth/Login'); // Navigate to Login Page
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#333"
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#333"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={[styles.button, styles.linkedinButton]} onPress={() => signInWithLinkedIn()}>
        <Text style={styles.buttonText}>Sign Up with LinkedIn</Text>
      </TouchableOpacity>

      <Text style={styles.linkText} onPress={() => router.push('/auth/Login')}>
        Already have an account? Log In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { 
    width: '100%', 
    height: 45, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 8, 
    marginBottom: 15, 
    paddingHorizontal: 10, 
    backgroundColor: '#fff' 
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  linkedinButton: {
    backgroundColor: '#0072b1',
  },
  orText: { marginVertical: 10, fontSize: 16, fontWeight: 'bold' },
  linkText: { marginTop: 10, color: '#007bff', fontWeight: 'bold' },
});

export default SignUp;
