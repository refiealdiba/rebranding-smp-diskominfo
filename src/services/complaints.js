import { supabase } from "../config/db";

export const getComplaints = async () => {
    const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error fetching complaints:", error);
        return [];
    }
    return data;
}
export const getComplaintById = async (id) => {
    const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .eq("id", id)
        .single();
    if (error) {
        console.error("Error fetching complaint:", error);
        return null;
    }
    return data;
};
export const createComplaint = async (title, description) => {
    const { data, error } = await supabase
        .from("complaints")
        .insert([{ title, description }]);
    if (error) {
        console.error("Error creating complaint:", error);
        return null;
    }
    return data;
};