import supabase from './supabase';
import * as WebBrowser from 'expo-web-browser';

// Ensure WebBrowser session is not active
WebBrowser.maybeCompleteAuthSession();

// 🔹 Sign Up with Email & Password
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Sign Up Error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, user: data.user };
};

// 🔹 Log In with Email & Password
export const logIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Log In Error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, user: data.user };
};

// 🔹 Sign in with LinkedIn OAuth (OIDC)
export const signInWithLinkedIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin_oidc',  // 🔥 MUST use 'linkedin_oidc' (not 'linkedin')
    options: {
      redirectTo: 'exp://127.0.0.1:19000/--/auth/callback',  // Update for production
    },
  });

  if (error) {
    console.error(`LinkedIn Sign In Error:`, error.message);
    return { success: false, error: error.message };
  }

  console.log("Redirecting to:", data.url);

  if (data?.url) {
    await WebBrowser.openBrowserAsync(data.url); // Open LinkedIn login in a browser
    return { success: true };
  }

  return { success: false, error: "No redirect URL returned from Supabase" };
};

// 🔹 Get Current Authenticated User
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting current user:', error.message);
    return { success: false, user: null, error: error.message };
  }

  return { success: true, user: data.user };
};

// 🔹 Log Out
export const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Log Out Error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};
