import { Link } from "react-router-dom";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { getEmployees } from "../../services/employee";

const dummyData = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    nama: `Guru ${i + 1}`,
    jabatan: i % 2 === 0 ? "Guru Mapel" : "Staf TU",
    foto: "https://via.placeholder.com/60", // contoh gambar placeholder
}));

const ITEMS_PER_PAGE = 10;

const GuruKaryawanAdmin = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedEmployees = employees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="flex flex-col gap-12 px-4 py-10 font-inter">
            <div className="font-bold self-start">
                <h1 className="text-lg sm:text-xl md:text-2xl text-smporange">Guru dan Karyawan</h1>
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
                                            <button
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
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

export default GuruKaryawanAdmin;
