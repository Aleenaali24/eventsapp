import supabase from './supabase';

// Define the User type (based on your `users` table schema)
export interface User {
  id: string;
  email: string;
  password?: string;  // Password should never be exposed in production
  role: 'admin' | 'attendee';
  created_at: string;
}

// 🔹 Get the currently authenticated user
export const getCurrentUser = async (): Promise<{ success: boolean; user: any | null; error?: any }> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching current user:', error);
    return { success: false, user: null, error };
  }

  return { success: true, user: data?.user || null };
};

// 🔹 Insert a user into the `users` table (Create)
export const addUser = async (
  email: string,
  password: string,
  role: 'admin' | 'attendee'
): Promise<{ success: boolean; data: User[] | null; error?: any }> => {
  const { data, error } = await supabase.from('users').insert([
    {
      email: email,
      password: password,  // In production, you should hash the password before storing it
      role: role,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error('Error adding user:', error);
    return { success: false, data: null, error };
  }

  return { success: true, data: data || null };  // Ensure data is never undefined
};

// 🔹 Get all users (Read)
export const getUsers = async (): Promise<{ success: boolean; data: User[] | null; error?: any }> => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return { success: false, data: null, error };
  }

  return { success: true, data: data || null };
};

// 🔹 Update a user's role (Update)
export const updateUserRole = async (
  userId: string,
  newRole: 'admin' | 'attendee'
): Promise<{ success: boolean; data: User[] | null; error?: any }> => {
  const { data, error } = await supabase
    .from('users')
    .update({ role: newRole })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user:', error);
    return { success: false, data: null, error };
  }

  return { success: true, data: data || null };
};

// 🔹 Delete a user (Delete)
export const deleteUser = async (userId: string): Promise<{ success: boolean; data: User[] | null; error?: any }> => {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user:', error);
    return { success: false, data: null, error };
  }

  return { success: true, data: data || null };
};
