import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function TermOfService() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms of Service</Text>
      <Text style={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel
        massa quis nunc vestibulum tincidunt nec vitae lectus. Proin auctor,
        lorem eu consectetur convallis, elit turpis vulputate tellus, et dictum
        justo libero in arcu. Suspendisse tristique varius efficitur.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default TermOfService;
