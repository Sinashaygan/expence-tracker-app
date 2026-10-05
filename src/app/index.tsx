import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  function openManageExpense() {
    router.push("/manage-expense");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Expenses</Text>

      <Pressable style={styles.button} onPress={openManageExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  button: {
    padding: 14,
    backgroundColor: "#351401",
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
