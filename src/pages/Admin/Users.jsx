import { useState, useEffect } from "react";
import { PlusCircle, XCircle } from "lucide-react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/employee";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    position: "",
    photo: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    position: "",
    photo: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getEmployees();
    setUsers(data);
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.position) {
      return alert("Nama dan Posisi wajib diisi.");
    }

    const data = await createEmployee(newUser.name, newUser.position);
    if (data) {
      fetchUsers();
      setNewUser({ name: "", position: "", photo: "" });
      setShowForm(false);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditData({
      name: user.name,
      position: user.position,
      photo: user.photo || "",
    });
  };

  const handleSave = async () => {
    const data = await updateEmployee(editId, editData.name, editData.position);
    if (data) {
      fetchUsers();
      setEditId(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pengguna ini?")) {
      const data = await deleteEmployee(id);
      if (data) fetchUsers();
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-smporange mb-4">Kelola Pegawai</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className={`mb-4 flex items-center gap-2 px-4 py-2 rounded font-medium text-white transition ${
          showForm
            ? "bg-red-500 hover:bg-red-600"
            : "bg-smporange hover:bg-orange-600"
        }`}
      >
        {showForm ? <XCircle size={20} /> : <PlusCircle size={20} />}
        {showForm ? "Tutup Form" : "Tambah Pegawai"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nama"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Posisi"
              value={newUser.position}
              onChange={(e) =>
                setNewUser({ ...newUser, position: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Link Foto (opsional)"
              value={newUser.photo}
              onChange={(e) =>
                setNewUser({ ...newUser, photo: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleAddUser}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Simpan Pegawai
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 shadow rounded-2xl overflow-hidden">
          <thead className="bg-smporange text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Posisi
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Foto
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b hover:bg-yellow-50 transition-all duration-200"
              >
                <td className="px-6 py-4">
                  {editId === u.id ? (
                    <input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    <span className="font-medium">{u.name}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editId === u.id ? (
                    <input
                      value={editData.position}
                      onChange={(e) =>
                        setEditData({ ...editData, position: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    u.position
                  )}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={u.photo || "https://via.placeholder.com/50"}
                    alt="Foto"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  {editId === u.id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Simpan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada pegawai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
