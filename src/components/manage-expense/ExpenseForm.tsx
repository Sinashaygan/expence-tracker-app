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
  onSubmit: (expenseData: ExpenseData) => Promise<void>;
  isEditing: boolean;
  isSubmitting: boolean;
  defaultValues?: Expense;
}

type InputState = {
  value: string;
  isValid: boolean;
};

type InputValues = {
  amount: InputState;
  date: InputState;
  description: InputState;
};

function getInitialValues(defaultValues?: Expense): InputValues {
  return {
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },

    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },

    description: {
      value: defaultValues?.description ?? "",
      isValid: true,
    },
  };
}

export default function ExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
  isSubmitting,
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
      [inputIdentifier]: {
        value: enteredValue,
        isValid: true,
      },
    }));
  }

  function submitHandler() {
    const amount = Number(inputValues.amount.value);
    const date = new Date(inputValues.date.value);
    const description = inputValues.description.value.trim();

    const amountIsValid = !isNaN(amount) && amount > 0;
    const dateIsValid =
      inputValues.date.value.trim().length > 0 && !isNaN(date.getTime());
    const descriptionIsValid = description.length > 0;

    setInputValues((currentValues) => ({
      amount: {
        ...currentValues.amount,
        isValid: amountIsValid,
      },

      date: {
        ...currentValues.date,
        isValid: dateIsValid,
      },

      description: {
        ...currentValues.description,
        isValid: descriptionIsValid,
      },
    }));

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert(
        "Invalid input",
        "Please check the entered amount, date, and description.",
      );
      return;
    }

    const expenseData: ExpenseData = {
      amount,
      date,
      description,
    };

    void onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (enteredValue) =>
              inputChangedHandler("amount", enteredValue),
            value: inputValues.amount.value,
          }}
          customStyle={styles.rowInput}
        />

        <Input
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (enteredValue) =>
              inputChangedHandler("date", enteredValue),
            value: inputValues.date.value,
          }}
          customStyle={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: (enteredValue) =>
            inputChangedHandler("description", enteredValue),
          value: inputValues.description.value,
        }}
      />

      <View style={styles.actions}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          style={styles.button}
          onPress={submitHandler}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update" : "Add"}
        </Button>
      </View>

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Please correct the highlighted fields.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },

  title: {
    color: GlobalStyles.colors.primary50,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  inputsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 4,
  },

  rowInput: {
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginTop: 8,
  },

  button: {
    flex: 1,
    minHeight: 40,
    marginHorizontal: 0,
  },

  errorText: {
    color: GlobalStyles.colors.error500,
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
  },
});
