import { supabase } from "../config/db";

export const getArticles = async () => {
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
    return data;
};

export const getArticleLatest = async (limit) => {
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);
    if (error) {
        console.error("Error fetching latest article:", error);
        return null;
    }
    return data;
};

export const getLatestArticleId = async () => {
    const { data, error } = await supabase
        .from("articles")
        .select("id")
        .order("id", { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error("Error fetching latest article ID:", error);
        return null;
    }

    return data.id;
};

export const getArticleById = async (id) => {
    const { data, error } = await supabase.from("articles").select("*").eq("id", id).single();
    if (error) {
        console.error("Error fetching article:", error);
        return null;
    }
    return data;
};

export const createArticle = async (title, content) => {
    const { data, error } = await supabase.from("articles").insert([{ title, content }]);
    if (error) {
        console.error("Error creating article:", error);
        return null;
    }
    return data;
};

export const updateArticle = async (id, title, content) => {
    const { data, error } = await supabase.from("articles").update({ title, content }).eq("id", id);
    if (error) {
        console.error("Error updating article:", error);
        return null;
    }
    return data;
};

export const deleteArticle = async (id) => {
    const { data, error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
        console.error("Error deleting article:", error);
        return null;
    }
    return data;
};
