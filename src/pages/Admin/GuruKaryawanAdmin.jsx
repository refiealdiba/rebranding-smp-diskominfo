import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { getEmployees, deleteEmployee } from "../../services/employee";

const ITEMS_PER_PAGE = 10;

const GuruKaryawanAdmin = () => {
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedEmployees = employees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    const openConfirmModal = (id) => {
        setSelectedId(id);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        try {
            const result = await deleteEmployee(selectedId);
            if (result) {
                alert("Data berhasil dihapus.");
                setEmployees((prev) => prev.filter((emp) => emp.id !== selectedId));
            }
        } catch (error) {
            console.error("Gagal menghapus data:", error);
            alert("Terjadi kesalahan saat menghapus data.");
        } finally {
            setShowConfirmModal(false);
            setSelectedId(null);
            navigate(0);
        }
    };

    // const handleDelete = async (id) => {
    //     const confirmed = window.confirm("Yakin ingin menghapus data ini?");
    //     if (!confirmed) return;

    //     try {
    //         const result = await deleteEmployee(id);
    //         if (result) {
    //             navigate(0); // Ini akan 'refresh' halaman saat ini
    //             alert("Data berhasil dihapus.");
    //         }
    //     } catch (error) {
    //         console.error("Gagal menghapus data:", error);
    //         alert("Terjadi kesalahan saat menghapus data.");
    //     }
    // };

    useEffect(() => {
        fetchEmployees();
    }, []);
    return (
        <>
            <div className="flex flex-col gap-12 px-4 py-10 font-inter">
                <div className="font-bold self-start">
                    <h1 className="text-lg sm:text-xl md:text-2xl text-smporange">
                        Guru dan Karyawan
                    </h1>
                </div>

                <div className="flex flex-col gap-5">
                    <Link
                        to={"/admin/guruKaryawan/add"}
                        className="flex w-max items-center gap-2 bg-smporange text-white px-3 py-2 rounded-md"
                    >
                        <Plus size={16} />
                        <p className="text-sm">Tambah</p>
                    </Link>

                    <div className="bg-white rounded-xl p-4 shadow-2xl overflow-x-auto">
                        <h2 className="font-semibold text-md mb-4">Tabel Guru dan Karyawan</h2>
                        <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                                    <th className="px-4 py-3 border">No.</th>
                                    <th className="px-4 py-3 border">Foto</th>
                                    <th className="px-4 py-3 border">Nama</th>
                                    <th className="px-4 py-3 border">Posisi</th>
                                    <th className="px-4 py-3 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedEmployees.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border text-center">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            <img
                                                src={item.photo}
                                                alt={item.name}
                                                className="w-32 h-40 object-cover rounded-lg mx-auto"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border font-medium text-gray-800">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-2 border text-gray-700">
                                            {item.position}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    to={`/admin/guruKaryawan/${item.id}`}
                                                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                                                    title="Edit"
                                                >
                                                    <Pencil size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => openConfirmModal(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                                                    title="Hapus"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
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
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                }
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-80">
                        <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
                        <p>Yakin ingin menghapus data ini?</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GuruKaryawanAdmin;
