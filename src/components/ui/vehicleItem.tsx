import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Vehicle } from "@/types/vehicle";
import { THEME } from "@/theme/theme";
import { Link } from "expo-router";

type VehicleProps = {
  vehicle: Vehicle;
};
export default function VehicleItem({ vehicle }: VehicleProps) {
  return (
    <Link href={"/vehicles/view"} style={styles.container}>
      <View key={vehicle.id}>
        <Text style={styles.text}>{vehicle.description}</Text>
        <Text style={styles.text}>{vehicle.plate}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.secondary,
  },
  text: {
    color: "#fff",
  },
});
