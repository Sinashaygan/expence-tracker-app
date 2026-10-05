import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="all-expenses"
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
