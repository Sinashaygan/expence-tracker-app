import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../ui/Button";
import { GlobalStyles } from "@/constants/theme";
import { addExpense, Expense } from "@/constants/expenses.types";
import { getFormattedDate } from "@/utils/date";

type InputIdentifier = "amount" | "date" | "description";

interface Props {
  onCancel: () => void;
  onSubmit: (expenseData: addExpense) => void;
  isEditing: boolean;
  defaultValues: Expense;
}

export default function ExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
  defaultValues,
}: Props) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    description: defaultValues ? defaultValues.description.toString() : "",
  });

  function inputChangedHandler(
    inputIdentifier: InputIdentifier,
    enteredValue: string,
  ) {
    setInputValues((currentValues) => ({
      ...currentValues,
      [inputIdentifier]: enteredValue,
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: Number(inputValues.amount),
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (enteredValue) =>
              inputChangedHandler("amount", enteredValue),
            value: inputValues.amount,
          }}
          customStyle={styles.rowInput}
        />

        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (enteredValue) =>
              inputChangedHandler("date", enteredValue),
            value: inputValues.date,
          }}
          customStyle={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: (enteredValue) =>
            inputChangedHandler("description", enteredValue),
          value: inputValues.description,
        }}
      />

      <View style={styles.actions}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>

        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    marginVertical: 48,
  },

  title: {
    marginBottom: 22,
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  inputsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  rowInput: {
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    gap: 10,
  },

  button: {
    flex: 1,
    minHeight: 42,
    marginHorizontal: 0,
  },
});
