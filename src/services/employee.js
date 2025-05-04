import { supabase } from "../config/db";

export const getEmployees = async () => {
    const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
    return data;
}

export const createEmployee = async (name, position) => {
    const { data, error } = await supabase
        .from('employees')
        .insert([
            { name, position }
        ]);
    if (error) {
        console.error('Error creating employee:', error);
        return null;
    }
    return data;
}

export const updateEmployee = async (id, name, position) => {
    const { data, error } = await supabase
        .from('employees')
        .update({ name, position })
        .eq('id', id);
    if (error) {
        console.error('Error updating employee:', error);
        return null;
    }
    return data;
}

export const deleteEmployee = async (id) => {
    const { data, error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);
    if (error) {
        console.error('Error deleting employee:', error);
        return null;
    }
    return data;
}