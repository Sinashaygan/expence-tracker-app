import ExpenseForm from "@/components/manage-expense/ExpenseForm";
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
    if (isEditing && expenseId) {
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
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {isEditing ? "Edit your expense" : "Add a new expense"}
            </Text>

            <Text style={styles.subtitle}>
              {isEditing
                ? "Update the information below."
                : "Enter the details of your new expense."}
            </Text>
          </View>

          <View>
            <ExpenseForm
              isEditing={isEditing}
              onCancel={cancelHandler}
              onSubmit={confirmHandler}
            />
          </View>

          {isEditing && (
            <View style={styles.deleteSection}>
              <Text style={styles.deleteTitle}>Manage expense</Text>

              <Text style={styles.deleteDescription}>
                Remove this expense from your list.
              </Text>

              <IconButton
                icon="trash"
                color={GlobalStyles.colors.error500}
                size={30}
                onPress={deleteExpenseHandler}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 18,
  },

  header: {
    marginBottom: 0,
  },

  title: {
    color: GlobalStyles.colors.primary50,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },

  subtitle: {
    color: GlobalStyles.colors.primary200,
    fontSize: 12,
    lineHeight: 18,
  },

  formWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },

  deleteSection: {
    marginTop: 22,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
  },

  deleteTitle: {
    color: GlobalStyles.colors.primary50,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  deleteDescription: {
    color: GlobalStyles.colors.primary200,
    fontSize: 13,
    marginBottom: 12,
  },
});
