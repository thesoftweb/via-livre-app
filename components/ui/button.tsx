import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { THEME } from "../../theme/theme";

type Props = {
  label: string;
  onPress: () => void;
};

export default function Button({ label, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
    backgroundColor: THEME.colors.secondary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: THEME.font.regular,
    fontSize: 16,
    color: THEME.colors.dark,
    textAlign: "center",
    fontWeight: "bold",
  },
});
