import React from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function MoreTab({ navigation }) {
  const handleBackToLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.editButton}>
        <Button title="Back" color="#841584" onPress={handleBackToLogin} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
