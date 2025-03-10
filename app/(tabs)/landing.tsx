import { useState } from "react";
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, 
  Image, StyleSheet 
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Dummy Event Data (Static for UI Display)
const dummyEvents = [
  {
    id: "1",
    name: "Tech Conference 2025",
    logo: "https://via.placeholder.com/400x300",
    venue: "Toronto Convention Center",
    date: "April 20, 2025"
  },
  {
    id: "2",
    name: "Startup Networking Night",
    logo: "https://via.placeholder.com/400x300",
    venue: "Vancouver Tech Hub",
    date: "May 5, 2025"
  },
  {
    id: "3",
    name: "AI & Machine Learning Summit",
    logo: "https://via.placeholder.com/400x300",
    venue: "Calgary Innovation Hub",
    date: "June 12, 2025"
  }
];

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Calgary");

  return (
    <View style={styles.container}>
      {/* ✅ Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Find things to do..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* ✅ Location Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Enter City (e.g., Toronto, Vancouver)"
        placeholderTextColor="#aaa"
        value={location}
        onChangeText={setLocation}
      />

      {/* ✅ Event List (Static Data) */}
      <FlatList
        data={dummyEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventCard} onPress={() => router.push(`/event/${item.id}`)}>
            <Image source={{ uri: item.logo }} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{item.name}</Text>
              <Text style={styles.eventLocation}>{item.venue}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* ✅ Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/landing")}>
          <Ionicons name="home" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(tabs)/saved")}>
          <Ionicons name="heart-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(tabs)/tickets")}>
          <Ionicons name="ticket-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(tabs)/account")}>
          <Ionicons name="person-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingTop: 50, paddingHorizontal: 10 },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#1E1E1E", padding: 12, borderRadius: 8, marginBottom: 15 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: "white" },
  eventCard: { backgroundColor: "#1E1E1E", borderRadius: 10, marginBottom: 15, overflow: "hidden" },
  eventImage: { width: "100%", height: 180 },
  eventInfo: { padding: 15 },
  eventTitle: { fontSize: 18, fontWeight: "bold", color: "white" },
  eventLocation: { fontSize: 14, color: "#BBBBBB", marginTop: 5 },
  eventDate: { fontSize: 14, color: "#FFA500", marginTop: 5 },
  navbar: { position: "absolute", bottom: 0, width: "100%", flexDirection: "row", justifyContent: "space-around", backgroundColor: "#333", paddingVertical: 15 },
});
