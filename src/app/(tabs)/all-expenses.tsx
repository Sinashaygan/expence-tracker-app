import ExpensesOutput from "@/components/expenses-output/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { useContext } from "react";

export default function AllExpensesScreen() {
  const { expenses, isLoading, error, fetchExpenses } =
    useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallBackText="No registered expenses found."
      isLoading={isLoading}
      error={error}
      onRetry={fetchExpenses}
    />
  );
}
