import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator 
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { io } from "socket.io-client"; // ✅ WebSocket Client

// ✅ Define Event Type
type EventType = {
  _id: string;
  name: string;
  date: string;
  location: { city: string; province: string };
};

const HomeScreen = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState(""); // ✅ Province filter
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const router = useRouter();

  // ✅ Replace with your backend server IP or deployed URL
  const SERVER_URL = "http://YOUR_BACKEND_SERVER_IP:5000";

  // ✅ Fetch Events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SERVER_URL}/api/events?page=${page}&limit=5&search=${search}&province=${province}`
      );

      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("❌ Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ WebSocket Connection for Real-Time Updates
  useEffect(() => {
    fetchEvents(); // Initial fetch

    const socket = io(SERVER_URL);

    socket.on("eventUpdate", (newEvent: EventType) => {
      console.log("🔄 Real-time event update received:", newEvent);
      setEvents((prevEvents) => [newEvent, ...prevEvents]); // Insert latest event at the top
    });

    return () => {
      socket.disconnect(); // ✅ Clean up WebSocket connection
    };
  }, [page, search, province]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* ✅ Search Input */}
      <TextInput
        placeholder="Search events..."
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={fetchEvents}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      {/* ✅ Province Filter */}
      <TextInput
        placeholder="Enter Province (e.g., Ontario)"
        value={province}
        onChangeText={setProvince}
        onSubmitEditing={fetchEvents}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      {/* ✅ Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          {/* ✅ Event List */}
          <FlatList
            data={events}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/[id]", 
                    params: { id: item._id.toString() },
                  })
                }
                style={{
                  padding: 15,
                  backgroundColor: "#f5f5f5",
                  marginBottom: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
                <Text>
                  📅 {item.date} | 📍 {item.location.city}, {item.location.province}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* ✅ Pagination Controls */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
              style={{
                padding: 10,
                backgroundColor: page > 1 ? "#007BFF" : "#ccc",
                borderRadius: 8,
                opacity: page > 1 ? 1 : 0.5,
              }}
              disabled={page === 1}
            >
              <Text style={{ color: "#fff" }}>⬅️ Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPage((prev) => prev + 1)}
              style={{
                padding: 10,
                backgroundColor: "#007BFF",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff" }}>Next ➡️</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
