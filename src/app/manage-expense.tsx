import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { GlobalStyles } from "@/constants/theme";
import { ExpensesContext } from "@/store/expenses-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ManageExpense() {
  const { addExpense, deleteExpense, updateExpense } =
    useContext(ExpensesContext);
  const { expenseId } = useLocalSearchParams<{
    expenseId?: string;
  }>();
  const isEditing = typeof expenseId === "string" && expenseId.length > 0;

  function deleteExpenseHandler() {
    if (!expenseId) {
      router.back();
      return;
    }

    deleteExpense(expenseId);
    router.back();
  }

  function cancelHandler() {
    router.back();
  }

  function confirmHandler() {
    if (isEditing) {
      updateExpense(expenseId, {
        description: "Updated pair of shoes",
        amount: 79.99,
        date: new Date(),
      });
    } else {
      addExpense({
        description: "A new pair of shoes",
        amount: 49.99,
        date: new Date(),
      });
    }
    router.back();
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? "Edit Expense" : "Add Expense",
        }}
      />

      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button style={styles.button} mode="flat" onPress={cancelHandler}>
            Cancel
          </Button>

          <Button style={styles.button} onPress={confirmHandler}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </View>

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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
