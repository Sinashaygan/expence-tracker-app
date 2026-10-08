import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "@/constants/theme";
import IconButton from "@/components/ui/IconButton";
import { ExpensesContext } from "@/store/expenses-context";
import { useContext, useEffect } from "react";

export default function TabsLayout() {
  const { fetchExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    fetchExpenses().catch((error) => {
      console.error("Failed to fetch expenses:", error);
    });
  }, [fetchExpenses]);

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="add"
              size={24}
              color={tintColor ?? "white"}
              onPress={() => router.push("/manage-expense")}
            />
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="all-expenses"
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
