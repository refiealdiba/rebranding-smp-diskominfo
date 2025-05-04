import { useEffect, useState } from "react";
import { supabase } from "../config/db";
import { signInWithGoogle, signOut } from "../services/auth";
import DropdownMenu from "./Home/DropdownMenu";

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                console.log("User is logged in");
                setUser(user);
            } else {
                console.log("User is not logged in");
            }
        }
        checkLogin();
    }, []);

    const handleSignOut = async () => {
        const error = await signOut();
        if (error) {
            console.error('Logout error:', error);
        } else {
            console.log('User logged out');
            setUser(null);
            window.location.reload();
        }
    }

    return (
        <div className="flex justify-center items-center gap-30 py-5 font-inter font-medium">
            <div className="logo">
                <img src="logo.png" alt="SMPN 20 Logo" className="w-16" />
            </div>
            <div className="linkList flex gap-8">
                <a href="" className="font-bold text-smporange">
                    Beranda
                </a>
                <div className="relative cursor-pointer">
                    <DropdownMenu menu="Profil" />
                </div>
                <a href="">Berita</a>
                <div className="relative cursor-pointer">
                    <DropdownMenu menu="Galeri" />
                </div>
                <a href="">Lab. IPA</a>
                <a href="">Ekstrakulikuler</a>
                <a href="">Perpustakaan</a>
                <a href="">Kontak</a>
                <a href="">Pengaduan</a>
            </div>
            <div className="flex">
                {user ? (
                    <div className="flex items-center gap-2">
                        <img src={user.user_metadata.avatar_url} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <span>{user.user_metadata.full_name}</span>
                        <div className="login bg-red-400 text-white px-5 py-2 rounded-full">
                            <button onClick={() => { handleSignOut() }}>Sign out</button>
                        </div>
                    </div>
                ) : (
                    <div className="login bg-smporange text-white px-5 py-2 rounded-full">
                        <button onClick={() => { signInWithGoogle() }}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
