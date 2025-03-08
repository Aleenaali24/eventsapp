import supabase from "./supabase";

// ✅ Function to Sign In a User
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Login Failed: ${(error as Error).message}`);
  }
}

// ✅ Function to Sign Up a New User
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Registration Failed: ${(error as Error).message}`);
  }
}

// ✅ Function to Sign Out a User
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error(`Logout Failed: ${(error as Error).message}`);
  }
}

// ✅ Function to Get Current User
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data.user;
  } catch (error) {
    throw new Error(`Fetching User Failed: ${(error as Error).message}`);
  }
}

// ✅ Function to Reset Password
export async function resetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`Password Reset Failed: ${(error as Error).message}`);
  }
}
