import ExpensesOutput from "@/components/expenses-output/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { useContext } from "react";

export default function RecentExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);
  return <ExpensesOutput expenses={expenses} periodName="Last 7 Days" />;
}
