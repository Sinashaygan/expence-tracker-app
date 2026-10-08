import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  icon: ComponentProps<typeof Ionicons>["name"];
  size: number;
  color: ComponentProps<typeof Ionicons>["color"];
  onPress: () => void;
  disabled?: boolean;
}

export default function IconButton({
  icon,
  size,
  color,
  onPress,
  disabled = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    opacity: 0.5,
  },
});
