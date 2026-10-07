import { GlobalStyles } from "@/constants/theme";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

interface Props {
  label: string;
  textInputConfig?: TextInputProps;
  customStyle?: object;
}

export default function Input({ label, textInputConfig, customStyle }: Props) {
  const haveCustomStyle = !!customStyle;
  return (
    <View style={[styles.inputContainer, haveCustomStyle && customStyle]}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...textInputConfig}
        style={[
          styles.input,
          textInputConfig?.multiline && styles.inputMultiline,
          textInputConfig?.style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
