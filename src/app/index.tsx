import { View, Text, StyleSheet } from "react-native";
import { THEME } from "@/theme/theme";
import Button from "@/components/ui/button";
import { router } from "expo-router";

export default function Screen() {
  const handleLogin = () => {
    console.log("navegar");
    router.push("auth/login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Via Livre</Text>
      <Button disabled={false} label="Acessar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.primary,
    padding: 10,
  },
  title: {
    fontFamily: THEME.font.regular,
    fontSize: 28,
    color: THEME.colors.white,
    marginBottom: 32,
  },
});
