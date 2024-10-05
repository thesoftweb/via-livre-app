import { supabase } from "@/lib/supabase";
import { Vehicle } from "@/types/vehicle";

export const getVehicles = async (user_id: string | undefined) => {
  return await supabase
    .from("Vehicles")
    .select("user_id,description,plate")
    .eq("user_id", user_id);
};

export const createVehicles = async (
  description: string,
  plate: string,
  user_id: string | undefined
) => {
  return await supabase
    .from("Vehicles")
    .insert({ description, plate, user_id });
};
