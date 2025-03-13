import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Text, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addUser, getUsers, updateUserRole, deleteUser, getCurrentUser, User } from './supabase_crud';

const UI: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'attendee'>('attendee');
  const [newRole, setNewRole] = useState<'admin' | 'attendee' | ''>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const result = await getUsers();
        if (result.success) {
          setUsers(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkAuth = async () => {
      const result = await getCurrentUser();
      if (result.success) {
        setCurrentUser(result.user);
      } else {
        console.error("No authenticated user found");
      }
    };

    fetchUsers();
    checkAuth();
  }, []);

  const handleAddUser = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    const result = await addUser(email, password, role);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'User added successfully!');
      setEmail('');
      setPassword('');
      setRole('attendee');
      refreshUsers();
    } else {
      Alert.alert('Error', 'Failed to add user');
    }
  };

  const handleUpdateUserRole = async () => {
    if (!selectedUserId || !newRole) {
      Alert.alert('Error', 'Please select a user and a new role');
      return;
    }

    setLoading(true);
    const result = await updateUserRole(selectedUserId, newRole);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'User role updated successfully!');
      refreshUsers();
    } else {
      Alert.alert('Error', 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        onPress: async () => {
          setLoading(true);
          const result = await deleteUser(userId);
          setLoading(false);

          if (result.success) {
            Alert.alert('Success', 'User deleted successfully!');
            refreshUsers();
          } else {
            Alert.alert('Error', 'Failed to delete user');
          }
        },
        style: 'destructive'
      }
    ]);
  };

  const refreshUsers = async () => {
    setLoading(true);
    const fetchUsers = await getUsers();
    setLoading(false);

    if (fetchUsers.success) {
      setUsers(fetchUsers.data || []);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <ActivityIndicator size="large" color="#007bff" />}

      {/* Authenticated User Info */}
      {currentUser ? (
        <Text style={styles.authInfo}>Logged in as: {currentUser.email}</Text>
      ) : (
        <Text style={styles.authError}>No user logged in</Text>
      )}

      {/* Add User Section */}
      <Text style={styles.header}>Add User</Text>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Attendee" value="attendee" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Add User" onPress={handleAddUser} color="#007bff" />
      </View>

      {/* Update User Role Section */}
      <Text style={styles.header}>Update User Role</Text>
      <Picker
        selectedValue={selectedUserId}
        onValueChange={(itemValue) => setSelectedUserId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select User" value="" />
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.email} value={user.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={newRole}
        onValueChange={(itemValue) => setNewRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select New Role" value="" />
        <Picker.Item label="Attendee" value="attendee" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Update Role" onPress={handleUpdateUserRole} color="#28a745" />
      </View>

      {/* Users List Section */}
      <Text style={styles.header}>Users List</Text>
      {users.length > 0 ? (
        users.map((user) => (
          <View key={user.id} style={styles.userRow}>
            <Text style={styles.userText}>{user.email} - {user.role}</Text>
            <Button title="Delete" onPress={() => handleDeleteUser(user.id)} color="#dc3545" />
          </View>
        ))
      ) : (
        <Text style={styles.noUsersText}>No users available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  authInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  authError: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
  noUsersText: {  // 🔥 Added missing style
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default UI;
