import { Link } from "react-router-dom";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState } from "react";

const dummyData = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    nama: `Guru ${i + 1}`,
    jabatan: i % 2 === 0 ? "Guru Mapel" : "Staf TU",
    foto: "https://via.placeholder.com/60", // contoh gambar placeholder
}));

const ITEMS_PER_PAGE = 10;

const GuruKaryawanAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = dummyData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col gap-12 px-4 py-10 font-inter">
            <div className="font-bold self-start">
                <h1 className="text-lg sm:text-xl md:text-2xl text-smporange">Guru dan Karyawan</h1>
            </div>

            <div className="flex flex-col gap-5">
                <Link
                    to={""}
                    className="flex w-max items-center gap-2 bg-smporange text-white px-3 py-2 rounded-md"
                >
                    <Plus size={16} />
                    <p className="text-sm">Tambah</p>
                </Link>

                <div className="bg-white rounded-xl p-4 shadow-2xl overflow-x-auto">
                    <h2 className="font-semibold text-md mb-4">Tabel Guru dan Karyawan</h2>
                    <table className="table-auto w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2 border">No.</th>
                                <th className="px-4 py-2 border">Foto</th>
                                <th className="px-4 py-2 border">Nama</th>
                                <th className="px-4 py-2 border">Jabatan</th>
                                <th className="px-4 py-2 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border text-center">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <img
                                            src={item.foto}
                                            alt={item.nama}
                                            className="w-12 h-12 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border">{item.nama}</td>
                                    <td className="px-4 py-2 border">{item.jabatan}</td>
                                    <td className="px-4 py-2 border flex gap-2">
                                        <button className="bg-yellow-400 text-white px-2 py-1 rounded">
                                            <Pencil size={14} />
                                        </button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded">
                                            <Trash size={14} />
                                        </button>
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
