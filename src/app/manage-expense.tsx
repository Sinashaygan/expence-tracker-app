import ExpenseForm from "@/components/manage-expense/ExpenseForm";
import IconButton from "@/components/ui/IconButton";
import { ExpenseData } from "@/constants/expenses.types";
import { GlobalStyles } from "@/constants/theme";
import { ExpensesContext } from "@/store/expenses-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function ManageExpense() {
  const { addExpense, deleteExpense, updateExpense, expenses, isMutating } =
    useContext(ExpensesContext);

  const { expenseId: rawExpenseId } = useLocalSearchParams<{
    expenseId?: string | string[];
  }>();

  const expenseId = typeof rawExpenseId === "string" ? rawExpenseId : undefined;

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  const isEditing = Boolean(expenseId);

  async function deleteExpenseHandler() {
    if (!expenseId) {
      router.back();
      return;
    }

    try {
      await deleteExpense(expenseId);
      router.back();
    } catch (error) {
      Alert.alert(
        "Could not delete expense",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  }

  function cancelHandler() {
    router.back();
  }

  async function confirmHandler(expenseData: ExpenseData) {
    try {
      if (isEditing && expenseId) {
        await updateExpense(expenseId, expenseData);
      } else {
        await addExpense(expenseData);
      }

      router.back();
    } catch (error) {
      Alert.alert(
        "Could not save expense",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
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

          <View style={styles.formWrapper}>
            <ExpenseForm
              isEditing={isEditing}
              onCancel={cancelHandler}
              onSubmit={confirmHandler}
              defaultValues={selectedExpense}
              isSubmitting={isMutating}
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
                disabled={isMutating}
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
    paddingTop: 20,
    paddingBottom: 14,
  },

  header: {
    marginBottom: 0,
  },

  title: {
    color: GlobalStyles.colors.primary50,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },

  subtitle: {
    color: GlobalStyles.colors.primary200,
    fontSize: 11,
    lineHeight: 16,
  },

  formWrapper: {
    // flex: 1,
    justifyContent: "center",
    paddingTop: 48,
  },

  deleteSection: {
    marginTop: 8,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.14)",
    alignItems: "center",
  },

  deleteTitle: {
    color: GlobalStyles.colors.primary50,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
  },

  deleteDescription: {
    color: GlobalStyles.colors.primary200,
    fontSize: 11,
    marginBottom: 8,
  },
});
