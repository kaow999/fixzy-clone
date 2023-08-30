import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Report from "../../component/report/report";
import History from "../../component/report/history";

const Tab = createMaterialTopTabNavigator();

export default function ReportScreen() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>Report Screen</Text>
    // </View>
    <Tab.Navigator>
      <Tab.Screen name="ReportTap" component={Report} />
      <Tab.Screen name="HistoryTap" component={History} />
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
