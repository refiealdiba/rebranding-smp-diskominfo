import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Test from "../pages/test";
import MainLayout from "../components/layouts/MainLayout";
import ProfilSmp from "../pages/ProfilSmp";
import VisiMisi from "../pages/VisiMisi";
import Berita from "../pages/Berita";
import BeritaDetail from "../pages/BeritaDetail";
import Sarana from "../pages/Sarana";
import Struktur from "../pages/Struktur";
import NotFound from "../pages/NotFound";
import GaleriVideo from "../pages/GaleriVideo";
import GaleriFoto from "../pages/GaleriFoto";
import GaleriPrestasi from "../pages/GaleriPrestasi";
import Kontak from "../pages/Kontak";
import Ekskul from "../pages/Ekskul";
import Pengaduan from "../pages/Pengaduan";
import Prestasi from "../pages/Prestasi";
import ProfilGuru from "../pages/ProfilGuru";
import GaleriFotoDetail from "../pages/GaleriFotoDetail";

import HomeAdmin from "../pages/Admin/HomeAdmin";
import Users from "../pages/Admin/Users";
import Articles from "../pages/Admin/Articles";
import Videos from "../pages/Admin/Videos";
import Achievements from "../pages/Admin/Achievements";
import Photos from "../pages/Admin/Photos";
import PhotoDetails from "../pages/Admin/PhotoDetails";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import GuruKaryawanAdmin from "../pages/Admin/GuruKaryawanAdmin";
import FormAddArticle from "../components/Admin/FormAddArticle";
import FormEditArticle from "../components/Admin/FormEditArticle";
import FormAddKaryawan from "../components/Admin/FormAddKaryawan";
import FormEditKaryawan from "../components/Admin/FormEditKaryawan";
import FormAddVideo from "../components/Admin/FormAddVideo";
import FormEditVideo from "../components/Admin/FormEditVideo";
import FormAddAchievement from "../components/Admin/FormAddAchievement";
import FormEditAchievement from "../components/Admin/FormEditAchievement";
import AdminPengaduan from "../pages/Admin/AdminPengaduan";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import FormAddPhoto from "../components/Admin/FormAddPhoto";

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
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
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
                path: "berita/:id",
                element: <BeritaDetail />,
            },
            {
                path: "galeriFoto",
                element: <GaleriFoto />,
            },
            {
                path: "galeriFoto/:id",
                element: <GaleriFotoDetail />,
            },
            {
                path: "galeriVideo",
                element: <GaleriVideo />,
            },
            {
                path: "galeriVideo/add",
                element: <FormAddVideo />,
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
        path: "/admin",
        element: <AdminDashboard />,
        children: [
            {
                index: true,
                element: <HomeAdmin />,
            },
            {
                path: "guruKaryawan",
                element: <GuruKaryawanAdmin />,
            },
            {
                path: "guruKaryawan/add",
                element: <FormAddKaryawan />,
            },
            {
                path: "guruKaryawan/:id",
                element: <FormEditKaryawan />,
            },
            {
                path: "berita",
                element: <Articles />,
            },
            {
                path: "berita/add",
                element: <FormAddArticle />,
            },
            {
                path: "berita/edit/:id",
                element: <FormEditArticle />,
            },
            {
                path: "galeriFoto",
                element: <Photos />,
            },
            {
                path: "galeriFoto/:id",
                element: <PhotoDetails />,
            },
            {
                path: "galeriFoto/add",
                element: <FormAddPhoto />,
            },
            {
                path: "galeriVideo",
                element: <Videos />,
            },
            {
                path: "galeriVideo/add",
                element: <FormAddVideo />,
            },
            {
                path: "galeriVideo/edit/:id",
                element: <FormEditVideo />,
            },
            {
                path: "galeriPrestasi",
                element: <Achievements />,
            },
            {
                path: "galeriPrestasi/add",
                element: <FormAddAchievement />,
            },
            {
                path: "galeriPrestasi/edit/:id",
                element: <FormEditAchievement />,
            },
            {
                path: "pengaduan",
                element: <AdminPengaduan />,
            },
        ],
    },
    {
        path: "*", // Fallback 404 global jika struktur rute diubah
        element: <NotFound />,
    },
]);

export default RouteList;
