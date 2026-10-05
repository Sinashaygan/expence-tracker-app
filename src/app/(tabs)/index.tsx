import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import ExpensesOutput from "@/components/expenses-output/ExpensesOutput";

export default function RecentExpensesScreen() {
  function handleAddExpense() {
    router.push("/manage-expense");
  }

  return <ExpensesOutput expensesPeriod="Last 7 Days"/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#351401",
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#351401",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
