import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "@/constants/theme";

type LoadingOverlayProps = {
  message?: string;
};

export default function LoadingOverlay({
  message = "Loading...",
}: LoadingOverlayProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.primary50} />

      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary800,
    gap: 12,
  },

  text: {
    color: GlobalStyles.colors.primary50,
    fontSize: 14,
  },
});
