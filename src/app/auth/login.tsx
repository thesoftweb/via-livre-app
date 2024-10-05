import "react-native-url-polyfill/auto";
import React, { useState } from "react";
import { Alert, StyleSheet, View, Pressable, TextInput } from "react-native";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/button";
import { THEME } from "@/theme/theme";
import { router } from "expo-router";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    console.log("LOADING", loading);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    router.replace("home");
  }

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

    if (error) Alert.alert(error.message);

    console.log(error?.message);

    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={false}
          placeholder="Password"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          disabled={loading}
          onPress={() => signInWithEmail()}
          label="Login"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          disabled={loading}
          onPress={() => signUpWithEmail()}
          label="Cadastre-se"
        />
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
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
  },
});
