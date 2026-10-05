import { Expense } from "@/constants/expenses.types";
import { Text, View } from "react-native";

interface Props {
  expenses: Expense[];
  periodName: string;
}

export default function ExpensesSummery({ periodName, expenses }: Props) {
  const expensesSum = expenses.reduce((sum, expenses) => {
    return sum + expenses.amount;
  } , 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
