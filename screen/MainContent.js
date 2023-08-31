import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ServiceTab from "./tab/ServiceTab";
import MarketTab from "./tab/MarketTab";
import ServiceListTab from "./tab/ServiceListTab";
import MoreTab from "./tab/MoreTab";

const Tab = createBottomTabNavigator();

export default function MainContentScreen({ route }) {
  const { userInfo } = route.params;

  return (
    <View style={styles.container}>
      <Tab.Navigator initialRouteName="Service">
        <Tab.Screen
          name="Service"
          component={ServiceTab}
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
          component={MarketTab}
          options={{
            tabBarLabel: "Market",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ServiceList"
          component={ServiceListTab}
          options={{
            tabBarLabel: "Service List",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-document" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreTab}
          options={{
            tabBarLabel: "More",
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
