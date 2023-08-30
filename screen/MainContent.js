import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ServiceScreen from "./tab/service";
import MarketScreen from "./tab/market";
import ReportScreen from "./tab/report";
import OtherScreen from "./tab/other";

const Tab = createBottomTabNavigator();

export default function MainContentScreen({ route }) {
  const { userInfo } = route.params;

  return (
    <View style={styles.container}>
      <Tab.Navigator initialRouteName="Service">
        <Tab.Screen
          name="Service"
          component={ServiceScreen}
          initialParams={{ userInfo: userInfo }}
          options={{
            tabBarLabel: "บริการ",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-cog" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Market"
          component={MarketScreen}
          options={{
            tabBarLabel: "Market",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Report"
          component={ReportScreen}
          options={{
            tabBarLabel: "Report",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-document" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Other"
          component={OtherScreen}
          options={{
            tabBarLabel: "Other",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-options" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
