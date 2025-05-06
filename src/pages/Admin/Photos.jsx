import { Link } from "react-router-dom";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { getPhotos, deletePhoto } from "../../services/photos";

const ITEMS_PER_PAGE = 10;

const PhotosAdmin = () => {
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPhotos = photos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(photos.length / ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await getPhotos();
                setPhotos(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPhotos();
    }, []);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Yakin ingin menghapus album ini?");
        if (confirm) {
            const deleted = await deletePhoto(id);
            if (deleted) {
                setPhotos(photos.filter((photo) => photo.id !== id));
            }
        }
    };

    return (
        <div className="flex flex-col gap-12 px-4 py-10 font-inter">
            <div className="font-bold self-start">
                <h1 className="text-lg sm:text-xl md:text-2xl text-smporange">Album Foto</h1>
            </div>

            <div className="flex flex-col gap-5">
                <Link
                    to={"/admin/galeriFoto/add"}
                    className="flex w-max items-center gap-2 bg-smporange text-white px-3 py-2 rounded-md"
                >
                    <Plus size={16} />
                    <p className="text-sm">Tambah Album</p>
                </Link>

                <div className="bg-white rounded-xl p-4 shadow-2xl overflow-x-auto">
                    <h2 className="font-semibold text-md mb-4">Tabel Album Foto</h2>
                    <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                                <th className="px-4 py-3 border">No.</th>
                                <th className="px-4 py-3 border">Thumbnail</th>
                                <th className="px-4 py-3 border">Judul</th>
                                <th className="px-4 py-3 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPhotos.map((photo, index) => (
                                <tr key={photo.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border text-center">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <img
                                            src={photo.url}
                                            alt={photo.title}
                                            className="w-32 h-20 object-cover rounded-lg mx-auto"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border font-medium text-gray-800">
                                        {photo.title}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/admin/photos/edit/${photo.id}`}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(photo.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                                                title="Hapus"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedPhotos.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">
                                        Tidak ada album foto.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-end mt-4 gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === i + 1
                                        ? "bg-smporange text-white"
                                        : "bg-gray-100"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotosAdmin;
