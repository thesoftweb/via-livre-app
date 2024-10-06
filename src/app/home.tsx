import "react-native-url-polyfill/auto";

import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { THEME } from "@/theme/theme";
import { getVehicles } from "@/services/supabase/vehicles-service";
import { Vehicle } from "@/types/vehicle";
import Button from "@/components/ui/button";
import { router } from "expo-router";
import VehicleItem from "@/components/ui/vehicleItem";

export default function Screen() {
  const [session, setSession] = useState<Session | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function getVechiclesApi() {
    console.log("consultou supabase");
    setIsRefreshing(true);
    const { data, error } = await getVehicles(session?.user.id);
    console.log(data);
    setVehicles(data);
    setIsRefreshing(false);
  }

  useEffect(() => {
    getVechiclesApi();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session?.user);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.vehiclesList}>
        <Text style={styles.title}>Meus Veiculos</Text>

        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.plate.toString()}
          renderItem={({ item }) => <VehicleItem vehicle={item} />}
          refreshing={isRefreshing}
          refreshControl={
            <RefreshControl
              onRefresh={getVechiclesApi}
              refreshing={isRefreshing}
            />
          }
        />
      </ScrollView>

      <Button
        label="Cadastar Veiculo"
        onPress={() => router.push("/vehicles/create")}
        disabled={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
    padding: 10,
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
