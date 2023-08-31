import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CompletedJobs from "../../component/report/CompletedJobs";
import Orders from "../../component/report/Orders";

const Tab = createMaterialTopTabNavigator();

export default function ServiceListTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen
        name="Completed Jobs"
        component={CompletedJobs}
        options={{
          tabBarLabel: "Service List",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
