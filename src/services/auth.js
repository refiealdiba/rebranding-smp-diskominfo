import { supabase } from '../config/db';


export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });

    if (error) {
        console.error('Login error:', error);
    } else {
        console.log('User logged in:', data);
    }
};

export const registerWithEmail = async (name, email, password) => {
    console.log(name, email, password);
    const { data, error }= await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { display_name: name } // Simpan display name di metadata
        }
    });

    if (error) {
        console.error("Registrasi gagal:", error.message);
    } else {
        console.log("Registrasi berhasil:", data);
    }
};

export const loginWithEmail = async (email, password) => {
    const { data, error }= await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Login gagal:", error.message);
    } else {
        console.log("Login berhasil:", data);
    }
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Logout error:', error);
    } else {
        console.log('User logged out');
    }
}
