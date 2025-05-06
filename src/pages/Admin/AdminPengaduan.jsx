import { useState } from "react";
import { Pencil, Trash } from "lucide-react";

const AdminPengaduan = () => {
    const [pengaduan, setPengaduan] = useState([
        { id: 1, nama: "Ahmad", email: "ahmad@example.com", pesan: "Jalan rusak." },
        { id: 2, nama: "Siti", email: "siti@example.com", pesan: "Lampu mati." },
    ]);

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
            <div className="max-w-4xl mx-auto space-y-10">
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
                                <th className="px-4 py-2 border text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pengaduan.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border">{item.nama}</td>
                                    <td className="px-4 py-2 border">{item.email}</td>
                                    <td className="px-4 py-2 border">{item.pesan}</td>
                                    <td className="px-4 py-2 border text-center">
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
                                        </div>
                                    </td>
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
        </div>
    );
};

export default AdminPengaduan;
