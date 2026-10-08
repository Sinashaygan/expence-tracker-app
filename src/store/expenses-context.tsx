import type { Expense, ExpenseData } from "@/constants/expenses.types";
import {
  deleteExpense as deleteExpenseRequest,
  fetchExpenses as fetchExpensesRequest,
  storeExpense,
  updateExpense as updateExpenseRequest,
} from "@/services/expenses";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";

type ExpensesState = Expense[];

type Action =
  | { type: "SET"; payload: Expense[] }
  | { type: "ADD"; payload: Expense }
  | { type: "UPDATE"; payload: Expense }
  | { type: "DELETE"; payload: string };

function expensesReducer(state: ExpensesState, action: Action): ExpensesState {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense,
      );
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

type ExpensesContextValue = {
  expenses: Expense[];
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  fetchExpenses: () => Promise<void>;
  addExpense: (expenseData: ExpenseData) => Promise<Expense>;
  deleteExpense: (id: string) => Promise<void>;
  updateExpense: (id: string, expenseData: ExpenseData) => Promise<Expense>;
};

export const ExpensesContext = createContext<ExpensesContextValue>({
  expenses: [],
  isLoading: false,
  isMutating: false,
  error: null,
  fetchExpenses: async () => {},
  addExpense: async () => {
    throw new Error("ExpensesContextProvider is missing.");
  },
  deleteExpense: async () => {},
  updateExpense: async () => {
    throw new Error("ExpensesContextProvider is missing.");
  },
});

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred.";
}

export default function ExpensesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const expenses = await fetchExpensesRequest();
      dispatch({ type: "SET", payload: expenses });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expenseData: ExpenseData) => {
    setIsMutating(true);
    setError(null);

    try {
      const expense = await storeExpense(expenseData);
      dispatch({ type: "ADD", payload: expense });
      return expense;
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      throw requestError;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const deleteExpense = useCallback(async (id: string) => {
    setIsMutating(true);
    setError(null);

    try {
      await deleteExpenseRequest(id);
      dispatch({ type: "DELETE", payload: id });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      throw requestError;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const updateExpense = useCallback(
    async (id: string, expenseData: ExpenseData) => {
      setIsMutating(true);
      setError(null);

      try {
        const expense = await updateExpenseRequest(id, expenseData);
        dispatch({ type: "UPDATE", payload: expense });
        return expense;
      } catch (requestError) {
        setError(getErrorMessage(requestError));
        throw requestError;
      } finally {
        setIsMutating(false);
      }
    },
    [],
  );

  const contextValue = useMemo<ExpensesContextValue>(
    () => ({
      expenses: expensesState,
      isLoading,
      isMutating,
      error,
      fetchExpenses,
      addExpense,
      deleteExpense,
      updateExpense,
    }),
    [
      expensesState,
      isLoading,
      isMutating,
      error,
      fetchExpenses,
      addExpense,
      deleteExpense,
      updateExpense,
    ],
  );

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
}
