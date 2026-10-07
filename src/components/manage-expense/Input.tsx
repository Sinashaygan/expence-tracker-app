import { GlobalStyles } from "@/constants/theme";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

interface Props {
  label: string;
  invalid?: boolean;
  textInputConfig?: TextInputProps;
  customStyle?: StyleProp<ViewStyle>;
}

export default function Input({
  label,
  invalid = false,
  textInputConfig,
  customStyle,
}: Props) {
  return (
    <View style={[styles.inputContainer, customStyle]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>

      <TextInput
        {...textInputConfig}
        style={[
          styles.input,
          textInputConfig?.multiline && styles.inputMultiline,
          invalid && styles.invalidInput,
          textInputConfig?.style as StyleProp<TextStyle>,
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

  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },

  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    paddingHorizontal: 8,
    paddingVertical: 6,
    minHeight: 38,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "transparent",
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },

  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  invalidInput: {
    borderColor: GlobalStyles.colors.error500,
    backgroundColor: "#F5B4E0",
  },
});
