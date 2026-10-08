import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "@/constants/theme";

type ErrorOverlayProps = {
  message?: string;
};

export default function ErrorOverlay({
  message = "Something went wrong.",
}: ErrorOverlayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An error occurred</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  title: {
    color: GlobalStyles.colors.error500,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },

  message: {
    color: GlobalStyles.colors.primary200,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
});
