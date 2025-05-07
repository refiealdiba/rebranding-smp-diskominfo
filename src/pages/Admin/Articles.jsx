import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { getArticles, deleteArticle } from "../../services/articles";

const ITEMS_PER_PAGE = 10;

const Articles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchArticles = async () => {
        const data = await getArticles();
        setArticles(data);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Artikel yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        });

        if (result.isConfirmed) {
            try {
                const res = await deleteArticle(id);
                if (res) {
                    setArticles((prev) => prev.filter((a) => a.id !== id));

                    Swal.fire({
                        title: "Berhasil!",
                        text: "Artikel berhasil dihapus.",
                        icon: "success",
                        confirmButtonColor: "#f97316",
                    });
                } else {
                    Swal.fire({
                        title: "Berhasil!",
                        text: "Artikel berhasil dihapus.",
                        icon: "success",
                        confirmButtonColor: "#f97316",
                    });
                    fetchArticles();
                }
            } catch (error) {
                console.error("Terjadi kesalahan saat menghapus artikel:", error);
                Swal.fire({
                    title: "Gagal!",
                    text: "Terjadi kesalahan saat menghapus artikel.",
                    icon: "error",
                    confirmButtonColor: "#ef4444",
                });
            }
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col gap-12 px-4 py-10 font-inter">
            <div className="font-bold self-start">
                <h1 className="text-lg sm:text-xl md:text-2xl text-smporange">Berita</h1>
            </div>

            <Link
                to={"/admin/berita/add"}
                className="flex w-max items-center gap-2 bg-smporange text-white px-3 py-2 rounded-md"
            >
                <Plus size={16} />
                <p className="text-sm">Tambah</p>
            </Link>

            <div className="bg-white rounded-xl p-4 shadow-2xl overflow-x-auto">
                <h2 className="font-semibold text-md mb-4">Tabel Berita</h2>
                <table className="min-w-full text-sm border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">No.</th>
                            <th className="px-4 py-2 border">Thumbnail</th>
                            <th className="px-4 py-2 border">Judul</th>
                            <th className="px-4 py-2 border">Konten</th>
                            <th className="px-4 py-2 border">Tanggal</th>
                            <th className="px-4 py-2 border text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedArticles.length > 0 ? (
                            paginatedArticles.map((article, index) => (
                                <tr key={article.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border text-center">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <img
                                            src={article.thumbnail}
                                            alt={article.title}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border font-medium">
                                        {article.title}
                                    </td>
                                    <td className="px-4 py-2 border text-gray-600">
                                        {article.content.length > 100
                                            ? article.content.substring(0, 100) + "..."
                                            : article.content}
                                    </td>
                                    <td className="px-4 py-2 border text-sm text-gray-500">
                                        {new Date(article.created_at).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link
                                                to={`/admin/berita/edit/${article.id}`}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(article.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                                                title="Hapus"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    Tidak ada artikel untuk ditampilkan.
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

export default Articles;
