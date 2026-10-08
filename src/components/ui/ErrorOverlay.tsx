import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "@/constants/theme";
import Button from "./Button";

type ErrorOverlayProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorOverlay({
  message = "Something went wrong.",
  onRetry,
}: ErrorOverlayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>

      {onRetry && <Button onPress={onRetry}>Try again</Button>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
    marginTop: 32,
  },

  errorText: {
    color: GlobalStyles.colors.error50,
    fontSize: 15,
    textAlign: "center",
  },
});
