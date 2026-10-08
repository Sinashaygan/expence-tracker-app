import { StyleSheet, Text, View } from "react-native";
import ExpensesSummery from "./ExpensesSummery";
import ExpensesList from "./ExpensesList";
import { Expense } from "@/constants/expenses.types";
import { GlobalStyles } from "@/constants/theme";
import ExpensesLoading from "../ui/LoadingOverlay";
import ExpensesError from "../ui/ErrorOverlay";

interface Props {
  expenses: Expense[];
  periodName: string;
  fallBackText: string;
  isLoading: boolean;
  error: string | null;
  onRetry: () => Promise<void>;
}

export default function ExpensesOutput({
  periodName,
  expenses,
  fallBackText,
  isLoading,
  error,
  onRetry,
}: Props) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (isLoading) {
    content = <ExpensesLoading />;
  } else if (error) {
    content = <ExpensesError message={error} onRetry={onRetry} />;
  } else if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummery expenses={expenses} periodName={periodName} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
