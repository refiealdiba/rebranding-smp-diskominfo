import { useEffect, useState } from "react";
import { getPhotos } from "../../services/photos";
import { Link } from "react-router-dom";

const DokumentasiHomeList = () => {
    const [photos, setPhotos] = useState([]);

    // useEffect(() => {
    //     // Ganti dengan `getPhotos()` kalau sudah pakai API.
    //     setPhotos(getPhotos());
    // }, []);

    useEffect(() => {
        const getAllPhotos = async () => {
            try {
                const data = await getPhotos();
                setPhotos(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        getAllPhotos();
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-7 mt-5 font-poppins">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl">
                {somePhoto.map((photo) => (
                    <Link
                        key={photo.id}
                        to={`/galeriFoto/${photo.id}`}
                        className="relative rounded-md overflow-hidden shadow-md"
                    >
                        <img
                            src={photo.image}
                            alt={photo.title}
                            className="w-full h-80 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white p-4">
                            <h3 className="font-bold text-base">{photo.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                <Link
                    to="/galeriFoto"
                    className="font-inter font-bold text-base bg-smporange text-white px-7 py-4 rounded-full"
                >
                    Semua Foto
                </Link>
            </div>
        </div>
    );
};

const somePhoto = [
    {
        id: 1,
        image: "https://source.unsplash.com/600x400/?school,event",
        title: "Upacara Hari Senin",
        location: "Lapangan SMPN 20",
        city: "Semarang",
    },
    {
        id: 2,
        image: "https://source.unsplash.com/600x400/?students,library",
        title: "Kunjungan Perpustakaan Keliling",
        location: "Halaman Depan",
        city: "Semarang",
    },
    {
        id: 3,
        image: "https://source.unsplash.com/600x400/?batik,indonesia",
        title: "Hari Batik Nasional",
        location: "Aula Sekolah",
        city: "Semarang",
    },
    // {
    //     id: 4,
    //     image: "https://source.unsplash.com/600x400/?math,competition",
    //     title: "Math Trail Competition",
    //     location: "Kelas 8A dan Sekitar Sekolah",
    //     city: "Semarang",
    // },
    // {
    //     id: 5,
    //     image: "https://source.unsplash.com/600x400/?school,event,teacher",
    //     title: "Workshop Guru dan Staf",
    //     location: "Ruang Multimedia",
    //     city: "Semarang",
    // },
    // {
    //     id: 6,
    //     image: "https://source.unsplash.com/600x400/?cleaning,student",
    //     title: "Kegiatan Jumat Bersih",
    //     location: "Lingkungan Sekolah",
    //     city: "Semarang",
    // },
];

export default DokumentasiHomeList;
