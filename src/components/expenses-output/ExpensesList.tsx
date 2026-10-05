import { Expense } from "@/constants/expenses.types";
import { FlatList, Text } from "react-native";
import type { ListRenderItem } from "react-native";

interface Props {
  expenses: Expense[];
}

const renderExpenseItem: ListRenderItem<Expense> = (itemData) => {
  return <Text>{itemData.item.description}</Text>;
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
