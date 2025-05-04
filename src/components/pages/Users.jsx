import { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, XCircle } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    photo: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      return alert("Username, email, dan password wajib diisi.");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users", newUser);
      setUsers([...users, res.data]);
      setNewUser({ username: "", email: "", password: "", photo: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Gagal menambahkan pengguna:", error);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditData({
      username: user.username,
      email: user.email,
      photo: user.photo || "",
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editId}`, editData);
      setUsers(users.map((u) => (u.id === editId ? { ...u, ...editData } : u)));
      setEditId(null);
    } catch (error) {
      console.error("Gagal update pengguna:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pengguna ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(users.filter((u) => u.id !== id));
      } catch (error) {
        console.error("Gagal hapus pengguna:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-smporange mb-4">
        Kelola Pengguna
      </h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className={`mb-4 flex items-center gap-2 px-4 py-2 rounded font-medium text-white transition ${
          showForm
            ? "bg-red-500 hover:bg-red-600"
            : "bg-smporange hover:bg-orange-600"
        }`}
      >
        {showForm ? <XCircle size={20} /> : <PlusCircle size={20} />}
        {showForm ? "Tutup Form" : "Tambah Pengguna"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
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
            Simpan Pengguna
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 shadow rounded-2xl overflow-hidden">
          <thead className="bg-smporange text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Email
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
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    <span className="font-medium">{u.username}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editId === u.id ? (
                    <input
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={u.photo || "https://via.placeholder.com/50"}
                    alt="User"
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
                  Tidak ada pengguna.
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
