import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../ui/Button";

type InputIdentifier = "amount" | "date" | "description";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  isEditing: boolean;
}

export default function ExpenseForm({ onCancel, onSubmit, isEditing }: Props) {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
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

        <Button style={styles.button} onPress={onSubmit}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 32,
  },

  title: {
    marginVertical: 24,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  rowInput: {
    flex: 1,
  },

  button: {
    flex: 1,
    marginHorizontal: 6,
  },
});
