import ExpensesOutput from "@/components/expenses-output/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { getDateMinusDays } from "@/utils/date";
import { useContext } from "react";

export default function RecentExpensesScreen() {
  const { expenses, isLoading, error, fetchExpenses } =
    useContext(ExpensesContext);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallBackText="No expenses registered for the last 7 days."
      isLoading={isLoading}
      error={error}
      onRetry={fetchExpenses}
    />
  );
}
