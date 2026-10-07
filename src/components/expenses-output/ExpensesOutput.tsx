import { StyleSheet, View } from "react-native";
import ExpensesSummery from "./ExpensesSummery";
import ExpensesList from "./ExpensesList";
import { Expense } from "@/constants/expenses.types";
import { GlobalStyles } from "@/constants/theme";

interface Props {
  expenses: Expense[];
  periodName: string;
}

export default function ExpensesOutput({ periodName, expenses }: Props) {
  return (
    <View style={styles.container}>
      <ExpensesSummery expenses={expenses} periodName={periodName} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
