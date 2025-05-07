import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash } from "lucide-react";
import { getVideos, deleteVideo } from "../../services/videos";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 10;

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const fetchVideos = async () => {
        const data = await getVideos();
        setVideos(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const confirmDelete = (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data yang dihapus tidak bisa dikembalikan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
            }
        });
    };

    const handleDelete = async (id) => {
        setLoadingDelete(true);
        try {
            const res = await deleteVideo(id);
            if (res) {
                setVideos((prev) => prev.filter((v) => v.id !== id));
                Swal.fire("Berhasil!", "Video berhasil dihapus.", "success");
            } else {
                Swal.fire("Berhasil!", "Berhasil menghapus video.", "success");
            }
        } catch (error) {
            console.error("Error deleting video:", error);
            Swal.fire("Error", "Terjadi kesalahan saat menghapus video.", "error");
        } finally {
            setLoadingDelete(false);
            fetchVideos();
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedVideos = videos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil((videos?.length || 0) / ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col gap-12 px-4 py-10 font-inter">
            <div className="font-bold self-start">
                <h1 className="text-lg sm:text-xl md:text-2xl text-smporange">Video</h1>
            </div>

            <Link
                to={"/admin/galeriVideo/add"}
                className="flex w-max items-center gap-2 bg-smporange text-white px-3 py-2 rounded-md"
            >
                <Plus size={16} />
                <p className="text-sm">Tambah</p>
            </Link>

            <div className="bg-white rounded-xl p-4 shadow-2xl overflow-x-auto">
                <h2 className="font-semibold text-md mb-4">Tabel Video</h2>
                <table className="min-w-full text-sm border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">No.</th>
                            <th className="px-4 py-2 border">Judul</th>
                            <th className="px-4 py-2 border">Link Embed</th>
                            <th className="px-4 py-2 border text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedVideos.length > 0 ? (
                            paginatedVideos.map((video, index) => (
                                <tr key={video.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border text-center">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="px-4 py-2 border font-medium">{video.title}</td>
                                    <td className="px-4 py-2 border break-words">
                                        <a
                                            href={video.link_embed}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {video.link_embed}
                                        </a>
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link
                                                to={`/admin/galeriVideo/edit/${video.id}`}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() => confirmDelete(video.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                                                title="Hapus"
                                                disabled={loadingDelete}
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    Tidak ada video untuk ditampilkan.
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
                                currentPage === i + 1 ? "bg-smporange text-white" : "bg-gray-100"
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
    );
};

export default Videos;
