import { Expense } from "@/constants/expenses.types";
import { FlatList, Text } from "react-native";
import type { ListRenderItem } from "react-native";
import ExpenseItem from "./ExpenseItem";

interface Props {
  expenses: Expense[];
}

const renderExpenseItem: ListRenderItem<Expense> = ({ item }) => {
  const { id, ...expenseData } = item;

  return <ExpenseItem {...expenseData} />;
};


export default function ExpensesList({ expenses }: Props) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
