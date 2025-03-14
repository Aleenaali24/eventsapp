import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { logIn, signUp, signInWithLinkedIn } from '../../lib/supabase_auth';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LoginSignup = ({ isLogin = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    const result = isLogin ? await logIn(email, password) : await signUp(email, password);

    if (result.success) {
      Alert.alert('Success', isLogin ? 'Logged in successfully!' : 'Account created successfully!');
      router.push('/');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Login' : 'Sign Up'}</Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#333"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          placeholderTextColor="#333"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>

      {isLogin && (
        <Text style={styles.linkText} onPress={() => router.push('/(auth)/ForgotPassword')}>
          Forgot Password?
        </Text>
      )}

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={[styles.button, styles.linkedinButton]} onPress={signInWithLinkedIn}>
        <Text style={styles.buttonText}>{isLogin ? 'Login with LinkedIn' : 'Sign Up with LinkedIn'}</Text>
      </TouchableOpacity>

      <Text
        style={styles.linkText}
        onPress={() => router.push(isLogin ? '/auth/SignUp' : '/auth/Login')}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f8f9fa' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 10, backgroundColor: '#fff' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 10, backgroundColor: '#fff' },
  passwordInput: { flex: 1, height: '100%' },
  button: { backgroundColor: '#007bff', paddingVertical: 12, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkedinButton: { backgroundColor: '#0072b1' },
  orText: { marginVertical: 10, fontSize: 16, fontWeight: 'bold' },
  linkText: { marginTop: 10, color: '#007bff', fontWeight: 'bold' },
});

export default LoginSignup;