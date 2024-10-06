import "react-native-url-polyfill/auto";
import React, { useState } from "react";
import { Alert, StyleSheet, View, TextInput, Text } from "react-native";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/button";
import { THEME } from "@/theme/theme";
import { Link, router } from "expo-router";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.log(error?.message);
      Alert.alert(error.message);
      return setLoading(false);
    }

    if (!session) {
      Alert.alert("Please check your inbox for email verification!");
      setLoading(false);
    } else {
      setLoading(false);
      router.replace("home");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Via Livre</Text>
      <Text style={styles.label}>Criar conta</Text>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
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
          placeholder="Password"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          disabled={loading}
          onPress={() => signUpWithEmail()}
          label="Cadastre-se"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Link href={"/auth/login"}>
          <Text style={styles.label}>Ja possuo conta, Faça Login</Text>
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
  },
});
