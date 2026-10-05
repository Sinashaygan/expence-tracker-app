import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ManageExpenseScreen() {
  function handleSaveExpense() {
    console.log("Expense saved");
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Manage Expense",
        }}
      />

      <View style={styles.container}>
        <Text style={styles.label}>Title</Text>

        <TextInput style={styles.input} placeholder="Enter expense title" />

        <Text style={styles.label}>Amount</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="decimal-pad"
        />

        <Pressable style={styles.button} onPress={handleSaveExpense}>
          <Text style={styles.buttonText}>Save Expense</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#351401",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#351401",
    paddingVertical: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
