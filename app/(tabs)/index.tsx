import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import UI from '../../lib/ui';  // Import the main UI component
import SignUp from '../(auth)/SignUp';  // Import SignUp page
import { getCurrentUser } from '../../lib/supabase_auth';  // Import Supabase Auth helper

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const result = await getCurrentUser();
      if (result.success) {
        setUser(result.user);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {user ? <UI /> : <SignUp />} 
    </SafeAreaView>
  );
};

export default Index;
