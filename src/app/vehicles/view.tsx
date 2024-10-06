import Button from "@/components/ui/button";
import { THEME } from "@/theme/theme";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Screen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true }} />
      <View
        style={{ height: 300, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.title}>KOMBI BRANCA 200</Text>
        <Text style={styles.title}>GPD3548</Text>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 64,
          flex: 1,
        }}
      >
        <QRCode
          value="https://vialivre/vechicles/qrcode?=1234565544"
          size={200}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          padding: 10,
          gap: 6,
          width: "100%",
        }}
      >
        <Button
          label="Compartilhar QrCode"
          disabled={false}
          onPress={() => {}}
        />
        <Button label="Baixar QrCode" disabled={false} onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  vehiclesList: {
    paddingBottom: 20,
  },
  title: {
    fontFamily: THEME.font.regular,
    fontSize: 28,
    color: "#fff",
  },
});
