import ExpensesOutput from "@/components/expenses-output/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { getDateMinusDays } from "@/utils/date";
import { useContext } from "react";

export default function RecentExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });
  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 Days" />;
}
