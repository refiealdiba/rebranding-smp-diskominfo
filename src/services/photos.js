import { supabase } from "../config/db";

export const getPhotos = async () => {
    const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error fetching photos:", error);
        return [];
    }
    return data;
};

export const getPhotoLatest = async (limit) => {
    const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);
    if (error) {
        console.error("Error fetching latest photo:", error);
        return null;
    }
    return data;
};

export const getPhotoById = async (id) => {
    const { data, error } = await supabase.from("photos").select("*").eq("id", id).single();
    if (error) {
        console.error("Error fetching photo:", error);
        return null;
    }
    return data;
};

export const createPhoto = async (title, url) => {
    const { data, error } = await supabase.from("photos").insert([{ title, url }]);
    if (error) {
        console.error("Error creating photo:", error);
        return null;
    }
    return data;
};
export const updatePhoto = async (id, title, url) => {
    const { data, error } = await supabase.from("photos").update({ title, url }).eq("id", id);
    if (error) {
        console.error("Error updating photo:", error);
        return null;
    }
    return data;
};
export const deletePhoto = async (id) => {
    const { data, error } = await supabase.from("photos").delete().eq("id", id);
    if (error) {
        console.error("Error deleting photo:", error);
        return null;
    }
    return data;
};
