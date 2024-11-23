import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const App = () => {
  const [mood, setMood] = useState<number>(3);
  const [description, setDescription] = useState<string>("");
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleMoodSubmit = async () => {
    if (!description.trim()) {
      Alert.alert("Error", "Please provide a brief description of your mood.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/mood", {
        mood,
        description,
      });
      const { aiInsight } = response.data;

      setInsight(aiInsight);

      // Save to local storage
      const history = JSON.parse(
        (await AsyncStorage.getItem("moodHistory")) || "[]"
      );
      const newEntry = {
        mood,
        description,
        insight: aiInsight,
        date: new Date().toISOString(),
      };
      await AsyncStorage.setItem(
        "moodHistory",
        JSON.stringify([...history, newEntry])
      );
    } catch (error) {
      Alert.alert("Error", "Failed to get AI insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>
      <Text style={styles.label}>Mood (1-5): {mood}</Text>
      <View style={styles.sliderContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            title={`${value}`}
            onPress={() => setMood(value)}
          />
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Describe your mood"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Submit Mood" onPress={handleMoodSubmit} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {insight ? (
        <Text style={styles.insight}>AI Insight: {insight}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 18, marginBottom: 10 },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  insight: {
     marginTop: 20, 
     fontSize: 16,
      fontStyle: "italic",
       color: "#555" 
    }
});

export default App;
