export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export type ExpenseData = {
  description: string;
  amount: number;
  date: Date;
};
