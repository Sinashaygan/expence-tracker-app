import { Text, TextInput, TextInputProps, View } from "react-native";

interface Props {
  label: string;
  textInputConfig?: TextInputProps;
}

export default function Input({ label, textInputConfig }: Props) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
}
