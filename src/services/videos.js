import { supabase } from "../config/db";

export const getVideos = async () => {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
  return data;
};

export const getVideoById = async (id) => {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching video:", error);
    return null;
  }
  return data;
};

export const createVideo = async (title, url) => {
  const { data, error } = await supabase
    .from("videos")
    .insert([{ title, url }]);
  if (error) {
    console.error("Error creating video:", error);
    return null;
  }
  return data;
};
export const updateVideo = async (id, title, url) => {
  const { data, error } = await supabase
    .from("videos")
    .update({ title, url })
    .eq("id", id);
  if (error) {
    console.error("Error updating video:", error);
    return null;
  }
  return data;
};
export const deleteVideo = async (id) => {
  const { data, error } = await supabase.from("videos").delete().eq("id", id);
  if (error) {
    console.error("Error deleting video:", error);
    return null;
  }
  return data;
};
