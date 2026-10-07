import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../ui/Button";
import { GlobalStyles } from "@/constants/theme";
import type { Expense, ExpenseData } from "@/constants/expenses.types";
import { getFormattedDate } from "@/utils/date";

type InputIdentifier = "amount" | "date" | "description";

interface Props {
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseData) => void;
  isEditing: boolean;
  defaultValues?: Expense;
}

type InputValues = {
  amount: string;
  date: string;
  description: string;
};

function getInitialValues(defaultValues?: Expense): InputValues {
  return {
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    description: defaultValues?.description ?? "",
  };
}

export default function ExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
  defaultValues,
}: Props) {
  const [inputValues, setInputValues] = useState<InputValues>(() =>
    getInitialValues(defaultValues),
  );

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
    const expenseData: ExpenseData = {
      amount: Number(inputValues.amount),
      date: new Date(inputValues.date),
      description: inputValues.description.trim(),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input", "Please check your input values");
      return;
    }

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
  },

  title: {
    color: GlobalStyles.colors.primary50,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  inputsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 12,
  },

  rowInput: {
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginTop: 18,
  },

  button: {
    flex: 1,
    minHeight: 40,
    marginHorizontal: 0,
  },
});
