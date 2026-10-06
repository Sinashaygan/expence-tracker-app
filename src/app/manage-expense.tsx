import IconButton from "@/components/ui/IconButton";
import { GlobalStyles } from "@/constants/theme";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ManageExpense() {
  const { expenseId } = useLocalSearchParams<{
    expenseId?: string | string[];
  }>();
  const isEditing = typeof expenseId === "string" && expenseId.length > 0;

  function deleteExpenseHandler() {}

  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? "Edit Expense" : "Add Expense",
        }}
      />

      <View style={styles.container}>
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
