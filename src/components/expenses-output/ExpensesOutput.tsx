import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ExpensesSummery from "./ExpensesSummery";
import ExpensesList from "./ExpensesList";
import { Expense } from "@/constants/expenses.types";
import { GlobalStyles } from "@/constants/theme";
import Button from "@/components/ui/Button";

interface Props {
  expenses: Expense[];
  periodName: string;
  fallBackText: string;
  isLoading: boolean;
  error: string | null;
  onRetry: () => Promise<void>;
}

export default function ExpensesOutput({
  periodName,
  expenses,
  fallBackText,
  isLoading,
  error,
  onRetry,
}: Props) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (isLoading) {
    content = (
      <ActivityIndicator
        size="large"
        color={GlobalStyles.colors.primary200}
        style={styles.loadingIndicator}
      />
    );
  } else if (error) {
    content = (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          onPress={() => {
            onRetry().catch((retryError) => {
              console.error("Failed to retry fetching expenses:", retryError);
            });
          }}
        >
          Try again
        </Button>
      </View>
    );
  } else if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummery expenses={expenses} periodName={periodName} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  loadingIndicator: {
    marginTop: 32,
  },
  errorContainer: {
    marginTop: 32,
    gap: 12,
  },
  errorText: {
    color: GlobalStyles.colors.error50,
    fontSize: 15,
    textAlign: "center",
  },
});
