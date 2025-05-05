import { supabase } from "../config/db";

export const getAchivements = async () => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }
  return data;
};

export const getAchivementById = async (id) => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching achievement:", error);
    return null;
  }
  return data;
};

export const createAchivement = async (title, description) => {
  const { data, error } = await supabase
    .from("achievements")
    .insert([{ title, description }]);
  if (error) {
    console.error("Error creating achievement:", error);
    return null;
  }
  return data;
};

export const updateAchivement = async (id, title, description) => {
  const { data, error } = await supabase
    .from("achievements")
    .update({ title, description })
    .eq("id", id);
  if (error) {
    console.error("Error updating achievement:", error);
    return null;
  }
  return data;
};

export const deleteAchivement = async (id) => {
  const { data, error } = await supabase
    .from("achievements")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting achievement:", error);
    return null;
  }
  return data;
};
