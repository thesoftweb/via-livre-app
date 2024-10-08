import "react-native-url-polyfill/auto";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Text,
} from "react-native";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/button";
import { THEME } from "@/theme/theme";
import { Link, router } from "expo-router";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      router.replace("home");
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Via Livre</Text>
      <Text style={styles.label}>Login</Text>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={false}
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          disabled={loading}
          onPress={() => signInWithEmail()}
          label="Entrar"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Link href={"/auth/register"}>
          <Text style={styles.label}>Não tem uma conta? Cadastre-se</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.primary,
    padding: 16,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  title: {
    fontFamily: THEME.font.regular,
    fontSize: 28,
    color: THEME.colors.white,
    marginBottom: 32,
  },
  label: {
    color: "#fff",
    fontFamily: THEME.font.regular,
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    color: "#444",
    fontFamily: THEME.font.regular,
  },
});
