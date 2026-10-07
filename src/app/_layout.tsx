import { GlobalStyles } from "@/constants/theme";
import ExpensesContextProvider from "@/store/expenses-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="manage-expense"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </ExpensesContextProvider>
  );
}
