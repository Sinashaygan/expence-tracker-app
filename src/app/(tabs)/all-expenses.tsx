import ExpensesOutput from "@/components/expenses-output/ExpensesOutput";
import { StyleSheet, Text, View } from "react-native";

export default function AllExpensesScreen() {
  return (
    <ExpensesOutput expensesPeriod='Total'/>
  );
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
  },
});
