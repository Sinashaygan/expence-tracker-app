import type { Expense, ExpenseData } from "@/constants/expenses.types";
import { supabase } from "@/lib/supabase";

type ExpenseRow = {
  id: string;
  amount: number;
  date: string;
  description: string;
  created_at: string;
};

function mapExpense(row: ExpenseRow): Expense {
  return {
    id: row.id,
    amount: Number(row.amount),
    date: new Date(row.date),
    description: row.description,
  };
}

function toExpensePayload(expenseData: ExpenseData) {
  return {
    amount: expenseData.amount,
    date: expenseData.date.toISOString().split("T")[0],
    description: expenseData.description,
  };
}

export async function fetchExpenses(): Promise<Expense[]> {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw error;
  }

  return (data as ExpenseRow[]).map(mapExpense);
}

export async function storeExpense(
  expenseData: ExpenseData,
): Promise<Expense> {
  const { data, error } = await supabase
    .from("expenses")
    .insert(toExpensePayload(expenseData))
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapExpense(data as ExpenseRow);
}

export async function updateExpense(
  id: string,
  expenseData: ExpenseData,
): Promise<Expense> {
  const { data, error } = await supabase
    .from("expenses")
    .update(toExpensePayload(expenseData))
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapExpense(data as ExpenseRow);
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
