"use client";
import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employee";
import { getArticles } from "../../services/articles";
import { getPhotos } from "../../services/photos";
import { getVideos } from "../../services/videos";
import { getAchivements } from "../../services/achievements";

export default function HomeAdmin() {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalArticles, setTotalArticles] = useState(0);
    const [totalAlbums, setTotalAlbums] = useState(0);
    const [totalVideos, setTotalVideos] = useState(0);
    const [totalAchievements, setTotalAchievements] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const employees = await getEmployees();
            setTotalEmployees(employees.length);

            const articles = await getArticles();
            setTotalArticles(articles.length);

            const albums = await getPhotos();
            setTotalAlbums(albums.length);

            const videos = await getVideos();
            setTotalVideos(videos.length);

            const achievements = await getAchivements();
            setTotalAchievements(achievements.length);
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 bg-white shadow rounded-lg min-h-screen font-inter">
            <h1 className="text-2xl font-bold text-smporange mb-2">
                Dashboard SMP Negeri 20 Semarang
            </h1>
            <p className="mb-6 text-gray-700">Selamat datang di halaman dashboard utama!</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 shadow rounded-2xl border-l-4 border-blue-500">
                    <h2 className="text-lg font-semibold mb-2">Guru & Karyawan</h2>
                    <p className="text-2xl font-bold text-blue-600">{totalEmployees}</p>
                </div>
                <div className="bg-white p-4 shadow rounded-2xl border-l-4 border-green-500">
                    <h2 className="text-lg font-semibold mb-2">Total Artikel</h2>
                    <p className="text-2xl font-bold text-green-600">{totalArticles}</p>
                </div>
                <div className="bg-white p-4 shadow rounded-2xl border-l-4 border-purple-500">
                    <h2 className="text-lg font-semibold mb-2">Total Album</h2>
                    <p className="text-2xl font-bold text-purple-600">{totalAlbums}</p>
                </div>
                <div className="bg-white p-4 shadow rounded-2xl border-l-4 border-red-500">
                    <h2 className="text-lg font-semibold mb-2">Total Video</h2>
                    <p className="text-2xl font-bold text-red-600">{totalVideos}</p>
                </div>
                <div className="bg-white p-4 shadow rounded-2xl border-l-4 border-indigo-500">
                    <h2 className="text-lg font-semibold mb-2">Total Prestasi</h2>
                    <p className="text-2xl font-bold text-indigo-600">{totalAchievements}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Tentang Sekolah</h2>
                <p className="text-gray-600 leading-relaxed">
                    SMP Negeri 20 Semarang adalah sekolah yang berkomitmen dalam memberikan
                    pendidikan terbaik bagi siswa-siswinya. Dashboard ini merupakan pusat informasi
                    untuk manajemen konten seperti berita, galeri foto, video, dan pencapaian siswa.
                </p>
            </div>
        </div>
    );
}
