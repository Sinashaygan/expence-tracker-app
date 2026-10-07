import ExpensesOutput from "@/components/expenses-output/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { useContext } from "react";

export default function AllExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);
  return <ExpensesOutput expenses={expenses} periodName="Total" />;
}
