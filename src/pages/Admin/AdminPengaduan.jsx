import { useEffect, useState } from "react";
import { NotebookText } from "lucide-react";
import { getComplaints } from "../../services/complaints";
import { Link } from "react-router-dom";

const AdminPengaduan = () => {
    const [pengaduan, setPengaduan] = useState([]);

    useEffect(() => {
        const fetchPengaduan = async () => {
            const result = await getComplaints();
            setPengaduan(result);
        };
        fetchPengaduan();
    }, []);
    // const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
    // const [isEditing, setIsEditing] = useState(false);
    // const [editId, setEditId] = useState(null);

    // const handleChange = (e) => {
    //   setForm({ ...form, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = (e) => {
    //   e.preventDefault();

    //   if (!form.nama || !form.email || !form.pesan) {
    //     alert("Harap lengkapi semua kolom!");
    //     return;
    //   }

    //   if (isEditing) {
    //     setPengaduan((prev) =>
    //       prev.map((item) => (item.id === editId ? { ...item, ...form } : item))
    //     );
    //     setIsEditing(false);
    //     setEditId(null);
    //   } else {
    //     const newItem = {
    //       id: Date.now(),
    //       ...form,
    //     };
    //     setPengaduan([...pengaduan, newItem]);
    //   }

    //   setForm({ nama: "", email: "", pesan: "" });
    // };

    // const handleEdit = (item) => {
    //   setIsEditing(true);
    //   setEditId(item.id);
    //   setForm({ nama: item.nama, email: item.email, pesan: item.pesan });
    // };

    // const handleDelete = (id) => {
    //   if (confirm("Yakin ingin menghapus pengaduan ini?")) {
    //     setPengaduan((prev) => prev.filter((item) => item.id !== id));
    //   }
    // };

    return (
        <div className="px-4 py-10 font-inter bg-gray-50 min-h-screen">
            <div className="font-bold self-start mb-10">
                <h1 className="text-lg sm:text-xl md:text-2xl text-smporange">Pengaduan</h1>
            </div>
            {/* Table */}
            <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <h2 className="text-lg font-semibold mb-4">Daftar Pengaduan</h2>
                <table className="w-full text-sm border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">No.</th>
                            <th className="px-4 py-2 border">Nama</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Pesan</th>
                            {/* <th className="px-4 py-2 border text-center">Aksi</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {pengaduan.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border text-center">{index + 1}</td>
                                <td className="px-4 py-2 border">{item.name}</td>
                                <td className="px-4 py-2 border">{item.email}</td>
                                <td className="px-4 py-2 border">{item.complaint}</td>
                                {/* <td className="px-4 py-2 border text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                                            >
                                                <Trash size={16} />
                                            </button>
                                            <Link
                                                to={`/admin/pengaduan/${item.id}`}
                                                className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded"
                                            >
                                                <NotebookText size={16} />
                                            </Link>
                                        </div>
                                    </td> */}
                            </tr>
                        ))}
                        {pengaduan.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    Tidak ada pengaduan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPengaduan;
