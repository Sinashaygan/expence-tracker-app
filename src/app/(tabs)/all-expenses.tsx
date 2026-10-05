import { StyleSheet, Text, View } from "react-native";

export default function AllExpensesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Expenses</Text>

      <Text style={styles.emptyText}>All expenses will appear here.</Text>
    </View>
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
