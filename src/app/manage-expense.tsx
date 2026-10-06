import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ManageExpense() {
  const { expenseId } = useLocalSearchParams<{
    expenseId?: string | string[];
  }>();
  const isEditing = typeof expenseId === "string" && expenseId.length > 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? "Edit Expense" : "Add Expense",
        }}
      />

      <View>
        <Text>manage-expense</Text>
      </View>
    </>
  );
}
