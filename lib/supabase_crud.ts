// src/supabase_crud.ts
import supabase from './supabase';

// Define the User type (based on your `users` table schema)
export interface User {
  id: string;
  email: string;
  password: string;  // In production, you should hash the password before saving it
  role: 'admin' | 'attendee';
  created_at: string;
}

// Insert a user into the users table (Create)
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
  } else {
    console.log('User added:', data);
    return { success: true, data: data || null };  // Ensure data is never undefined
  }
};

// Get all users (Read)
export const getUsers = async (): Promise<{ success: boolean; data: User[] | null; error?: any }> => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return { success: false, data: null, error };
  } else {
    console.log('Users:', data);
    return { success: true, data: data || null };  // If no users are found, return null
  }
};

// Update a user's role (Update)
export const updateUserRole = async (
  userId: string,
  newRole: 'admin' | 'attendee'
): Promise<{ success: boolean; data: User[] | null; error?: any }> => {
  const { data, error } = await supabase
    .from('users')
    .update({ role: newRole })
    .eq('id', userId);  // `eq` ensures that only the user with the matching `userId` is updated

  if (error) {
    console.error('Error updating user:', error);
    return { success: false, data: null, error };
  } else {
    console.log('User updated:', data);
    return { success: true, data: data || null };  // Return null if no data is updated
  }
};

// Delete a user (Delete)
export const deleteUser = async (userId: string): Promise<{ success: boolean; data: User[] | null; error?: any }> => {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);  // Deletes the user by `id`

  if (error) {
    console.error('Error deleting user:', error);
    return { success: false, data: null, error };
  } else {
    console.log('User deleted:', data);
    return { success: true, data: data || null };  // Return null if no data is deleted
  }
};
