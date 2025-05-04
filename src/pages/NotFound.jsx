import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center gap-4">
            <h1 className="text-5xl font-bold text-red-600">404</h1>
            <p className="text-xl">Halaman tidak ditemukan</p>
            <Link
                to="/"
                className="mt-4 px-5 py-2 bg-smporange text-white rounded-lg hover:bg-orange-600 transition"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
};

export default NotFound;
