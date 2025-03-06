import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// ✅ Define TypeScript type for event
type EventType = {
  _id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  attendees: { name: string; email: string }[];
};

const EventDetails = () => {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return; // ✅ Prevent API call if `id` is missing

    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://192.168.108.1:5000/api/events/${id}`);
        const data: EventType = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>{event.name}</Text>
      <Text style={{ fontSize: 16, color: "#555" }}>{event.date} | {event.location}</Text>
      <Text style={{ marginVertical: 20 }}>{event.description}</Text>

      <TouchableOpacity
        onPress={() => router.push(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`)}
        style={{
          marginTop: 10,
          backgroundColor: "#28A745",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Open in Google Maps</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EventDetails;
