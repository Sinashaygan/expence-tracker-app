import { StyleSheet, Text, View } from "react-native";
import ExpensesSummery from "./ExpensesSummery";
import ExpensesList from "./ExpensesList";
import { Expense } from "@/constants/expenses.types";
import { GlobalStyles } from "@/constants/theme";

interface Props {
  expenses: Expense[];
  periodName: string;
  fallBackText: string;
}

export default function ExpensesOutput({
  periodName,
  expenses,
  fallBackText,
}: Props) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses.length > 0) {
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
