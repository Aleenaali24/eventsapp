import supabase from "./supabase";

// ✅ Function to Sign In a User
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw new Error(error.message);

    if (!data.session) {
      throw new Error("Login successful, but no active session found.");
    }

    return data; // ✅ Return session and user
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error(error instanceof Error ? error.message : "An unexpected login error occurred.");
  }
}

// ✅ Function to Sign Up a New User
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw new Error(error.message);

    if (!data.user) {
      throw new Error("Account created, but user data is missing.");
    }

    return data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw new Error(error instanceof Error ? error.message : "An unexpected signup error occurred.");
  }
}

// ✅ Function to Sign Out a User
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Logout Error:", error);
    throw new Error(error instanceof Error ? error.message : "An unexpected logout error occurred.");
  }
}

// ✅ Function to Get Current User (Ensures session exists)
export async function getCurrentUser() {
  try {
    // ✅ Step 1: Check if a session exists
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session) {
      throw new Error("No active session found. Please log in again.");
    }

    // ✅ Step 2: Fetch user details (Only if session exists)
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(userError.message);

    return userData.user;
  } catch (error) {
    console.error("Fetching User Error:", error);
    throw new Error(error instanceof Error ? error.message : "An unexpected error occurred while fetching user.");
  }
}