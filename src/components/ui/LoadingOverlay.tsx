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
      <ActivityIndicator size="large" color={GlobalStyles.colors.primary200} />

      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 32,
  },

  text: {
    color: GlobalStyles.colors.primary200,
    fontSize: 14,
  },
});
