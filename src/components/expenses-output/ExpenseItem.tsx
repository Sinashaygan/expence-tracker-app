import { GlobalStyles } from "@/constants/theme";
import { getFormattedDate } from "@/utils/date";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  description: string;
  amount: number;
  date: Date;
  id: number;
}

function ExpenseItem({ id, description, amount, date }: Props) {
  function expensePressHandler() {
    router.push({
      pathname: "/manage-expense",
      params: { expenseId: id },
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>

          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
  },

  textBase: {
    color: GlobalStyles.colors.primary50,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    minWidth: 80,
  },

  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.75,
  },
});
