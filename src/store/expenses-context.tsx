import { Expense } from "@/constants/expenses.types";
import { createContext, ReactNode, useReducer } from "react";

type ExpenseData = {
  description: string;
  amount: number;
  date: Date;
};

type UpdateExpenseData = Partial<ExpenseData>;

type ExpensesState = Expense[];

type Action =
  | {
      type: "ADD";
      payload: ExpenseData;
    }
  | {
      type: "UPDATE";
      payload: {
        id: string;
        data: UpdateExpenseData;
      };
    }
  | {
      type: "DELETE";
      payload: string;
    };

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2021-12-01"),
  },
];

function expensesReducer(state: ExpensesState, action: Action): ExpensesState {
  switch (action.type) {
    case "ADD": {
      const id = new Date().toISOString() + Math.random().toString();

      const newExpense: Expense = {
        ...action.payload,
        id,
      };

      return [newExpense, ...state];
    }

    case "UPDATE": {
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );

      if (updatableExpenseIndex === -1) {
        return state;
      }

      const updatableExpense = state[updatableExpenseIndex];

      const updatedExpense: Expense = {
        ...updatableExpense,
        ...action.payload.data,
      };

      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedExpense;

      return updatedExpenses;
    }

    case "DELETE": {
      return state.filter((expense) => expense.id !== action.payload);
    }

    default:
      return state;
  }
}

type ExpensesContextValue = {
  expenses: Expense[];
  addExpense: (expenseData: ExpenseData) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expenseData: UpdateExpenseData) => void;
};

export const ExpensesContext = createContext<ExpensesContextValue>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

export default function ExpensesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: ExpenseData) {
    dispatch({
      type: "ADD",
      payload: expenseData,
    });
  }

  function deleteExpense(id: string) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }

  function updateExpense(id: string, expenseData: UpdateExpenseData) {
    dispatch({
      type: "UPDATE",
      payload: {
        id,
        data: expenseData,
      },
    });
  }

  const contextValue: ExpensesContextValue = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
}
