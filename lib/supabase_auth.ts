import supabase from './supabase';
import * as WebBrowser from 'expo-web-browser';

// Ensure WebBrowser session is not active
WebBrowser.maybeCompleteAuthSession();

// 🔹 Sign Up with Email & Password
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('❌ Sign Up Error:', error.message);
      return { success: false, error: error.message };
    }

    console.log("✅ Sign Up Successful:", data.user);
    return { success: true, user: data.user };

  } catch (err) {
    console.error("❌ Unexpected Sign Up Error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// 🔹 Log In with Email & Password
export const logIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('❌ Log In Error:', error.message);
      return { success: false, error: error.message };
    }

    console.log("✅ Log In Successful:", data.user);
    return { success: true, user: data.user };

  } catch (err) {
    console.error("❌ Unexpected Log In Error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// 🔹 Sign in with LinkedIn OAuth (OIDC)
export const signInWithLinkedIn = async () => {
  try {
    const redirectUrl = 'https://your-supabase-project.supabase.co/auth/v1/callback';

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: { redirectTo: redirectUrl },
    });

    if (error) {
      console.error(`❌ LinkedIn Sign In Error:`, error.message);
      return { success: false, error: error.message };
    }

    console.log("🔗 Redirecting to:", data.url);

    if (data?.url) {
      await WebBrowser.openBrowserAsync(data.url);
      return await getCurrentUser();
    }

    return { success: false, error: "No redirect URL returned from Supabase" };

  } catch (err) {
    console.error("❌ LinkedIn Sign-In Unexpected Error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// 🔹 Get Current Authenticated User
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('❌ Error getting current user:', error.message);
      return { success: false, user: null, error: "No session found. Try logging in again." };
    }

    console.log("✅ Current User:", data.user);
    return { success: true, user: data.user };

  } catch (err) {
    console.error("❌ Unexpected Error in getCurrentUser:", err);
    return { success: false, user: null, error: "An unexpected error occurred" };
  }
};

// 🔹 Reset Password (without email verification)
export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.error('❌ Reset Password Error:', error.message);
      return { success: false, error: error.message };
    }

    console.log("✅ Password Reset Successful");
    return { success: true };

  } catch (err) {
    console.error("❌ Unexpected Reset Password Error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// 🔹 Log Out
export const logOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('❌ Log Out Error:', error.message);
      return { success: false, error: error.message };
    }

    console.log("✅ User Logged Out");
    return { success: true };

  } catch (err) {
    console.error("❌ Unexpected Error in logOut:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
};