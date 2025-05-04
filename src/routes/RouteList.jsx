import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Test from "../pages/test";
import MainLayout from "../components/layouts/MainLayout";
import ProfilSmp from "../pages/ProfilSmp";
import VisiMisi from "../pages/VisiMisi";
import Berita from "../pages/Berita";
import Sarana from "../pages/Sarana";
import Struktur from "../pages/Struktur";
import NotFound from "../pages/NotFound"; // Buat komponen ini
import GaleriVideo from "../pages/GaleriVideo";
import GaleriFoto from "../pages/GaleriFoto";
import GaleriPrestasi from "../pages/GaleriPrestasi";
import Kontak from "../pages/Kontak";
import Ekskul from "../pages/Ekskul";
import Pengaduan from "../pages/Pengaduan";
import Prestasi from "../pages/Prestasi";
import ProfilGuru from "../pages/ProfilGuru";

const RouteList = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "profilSekolah",
                element: <ProfilSmp />,
            },
            {
                path: "visiMisi",
                element: <VisiMisi />,
            },
            {
                path: "profilGuruKaryawan",
                element: <ProfilGuru />,
            },
            {
                path: "sarana",
                element: <Sarana />,
            },
            {
                path: "struktur",
                element: <Struktur />,
            },
            {
                path: "prestasi",
                element: <Prestasi />,
            },
            {
                path: "berita",
                element: <Berita />,
            },
            {
                path: "galeriFoto",
                element: <GaleriFoto />,
            },
            {
                path: "galeriVideo",
                element: <GaleriVideo />,
            },
            {
                path: "galeriPrestasi",
                element: <GaleriPrestasi />,
            },
            {
                path: "ekstrakulikuler",
                element: <Ekskul />,
            },
            {
                path: "kontak",
                element: <Kontak />,
            },
            {
                path: "pengaduan",
                element: <Pengaduan />,
            },
            {
                path: "test",
                element: <Test />,
            },
            {
                path: "*", // 404 fallback untuk route dalam MainLayout
                element: <NotFound />,
            },
        ],
    },
    {
        path: "*", // Fallback 404 global jika struktur rute diubah
        element: <NotFound />,
    },
]);

export default RouteList;
