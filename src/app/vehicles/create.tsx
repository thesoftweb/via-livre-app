import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { THEME } from "@/theme/theme";
import Button from "@/components/ui/button";
import { createVehicles } from "@/services/supabase/vehicles-service";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Stack } from "expo-router";

export default function Screen() {
  const [description, setDescription] = useState("");
  const [plate, setPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session?.user);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleCreateVehicle = async () => {
    const { error } = await createVehicles(
      description,
      plate,
      session?.user.id
    );
    if (!error) {
      Alert.alert("Veiculo Cadastrado com sucesso");
      setIsLoading(false);
    } else {
      Alert.alert(error.message);
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true }} />
      <Text style={styles.title}>Cadastrar Veiculo</Text>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setDescription(text)}
          value={description}
          autoCapitalize={"none"}
          style={styles.input}
          placeholder="Veiculo"
        />
      </View>

      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPlate(text)}
          value={plate}
          autoCapitalize={"characters"}
          style={styles.input}
          placeholder="Digite a Placa"
          maxLength={7}
        />
      </View>
      <Button
        label="Cadastrar Veiculo"
        disabled={isLoading}
        onPress={handleCreateVehicle}
      />
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
  title: {
    fontSize: 18,
    fontFamily: THEME.font.regular,
    color: "#fff",
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
    padding: 10,
    borderRadius: 8,
  },
});
