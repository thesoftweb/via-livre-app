import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../theme/theme";
import Button from "../components/ui/button";

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Via Livre</Text>
      <Button label="Acessar" onPress={() => {}} />
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
