import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addUser, getUsers, updateUserRole, deleteUser, User } from './supabase_crud';

const UI: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'attendee'>('attendee');
  const [newRole, setNewRole] = useState<'admin' | 'attendee' | ''>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  useEffect(() => { 
    const fetchUsers = async () => {
      const result = await getUsers();
      if (result.success) {
        setUsers(result.data || []);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    const result = await addUser(email, password, role);
    if (result.success) {
      Alert.alert('Success', 'User added successfully!');
      setEmail('');
      setPassword('');
      setRole('attendee');
      refreshUsers();
    }
  };

  const handleUpdateUserRole = async () => {
    if (!selectedUserId || !newRole) {
      Alert.alert('Error', 'Please select a user and a new role');
      return;
    }
    const result = await updateUserRole(selectedUserId, newRole);
    if (result.success) {
      Alert.alert('Success', 'User role updated successfully!');
      refreshUsers();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        onPress: async () => {
          const result = await deleteUser(userId);
          if (result.success) {
            Alert.alert('Success', 'User deleted successfully!');
            refreshUsers();
          }
        },
        style: 'destructive'
      }
    ]);
  };

  const refreshUsers = async () => {
    const fetchUsers = await getUsers();
    if (fetchUsers.success) {
      setUsers(fetchUsers.data || []);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Add User Section */}
      <Text style={styles.header}>Add User</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
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
      <Button title="Add User" onPress={handleAddUser} color="#007bff" />

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
      <Button title="Update Role" onPress={handleUpdateUserRole} color="#28a745" />

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
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
  noUsersText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
});

export default UI;
