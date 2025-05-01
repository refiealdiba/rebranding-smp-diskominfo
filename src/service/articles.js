import { supabase } from "../config/db"

export const getArticles = async () => {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
    if (error) {
        console.error('Error fetching articles:', error)
        return []
    }
    return data
}