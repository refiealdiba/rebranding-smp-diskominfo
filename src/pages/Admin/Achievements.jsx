import { useEffect, useState } from "react";
import { PlusCircle, XCircle } from "lucide-react";
import {
  getAchivements,
  createAchivement,
  updateAchivement,
  deleteAchivement,
} from "../../services/achievements";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", photo: "" });
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    photo: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const data = await getAchivements();
    setAchievements(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pencapaian ini?")) {
      const deleted = await deleteAchivement(id);
      if (deleted) {
        setAchievements(achievements.filter((a) => a.id !== id));
      }
    }
  };

  const handleEdit = (a) => {
    setEditId(a.id);
    setEditData({ title: a.title, photo: a.photo });
  };

  const handleSave = async () => {
    const updated = await updateAchivement(
      editId,
      editData.title,
      editData.photo
    );
    if (updated) {
      setAchievements(
        achievements.map((a) => (a.id === editId ? { ...a, ...editData } : a))
      );
      setEditId(null);
    }
  };

  const handleAdd = async () => {
    const created = await createAchivement(
      newAchievement.title,
      newAchievement.photo
    );
    if (created && created.length > 0) {
      setAchievements([created[0], ...achievements]);
      setNewAchievement({ title: "", photo: "" });
      setShowAddForm(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-smporange mb-6">
        Kelola Prestasi
      </h2>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className={`mb-4 flex items-center gap-2 px-4 py-2 rounded font-medium text-white transition ${
          showAddForm
            ? "bg-red-500 hover:bg-red-600"
            : "bg-smporange hover:bg-orange-600"
        }`}
      >
        {showAddForm ? <XCircle size={20} /> : <PlusCircle size={20} />}
        {showAddForm ? "Tutup Form" : "Tambah Prestasi"}
      </button>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Judul Prestasi"
              value={newAchievement.title}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, title: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="URL Foto"
              value={newAchievement.photo}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, photo: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Simpan Prestasi
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 shadow rounded-2xl overflow-hidden">
          <thead className="bg-smporange text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Judul
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
            {achievements.map((a) => (
              <tr
                key={a.id}
                className="border-b hover:bg-yellow-50 transition-all duration-200"
              >
                <td className="px-6 py-4">
                  {editId === a.id ? (
                    <input
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    <span className="font-medium">{a.title}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editId === a.id ? (
                    <input
                      value={editData.photo}
                      onChange={(e) =>
                        setEditData({ ...editData, photo: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    <img
                      src={a.photo}
                      alt={a.title}
                      className="w-14 h-14 object-cover rounded shadow"
                    />
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {editId === a.id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Simpan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(a)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {achievements.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Tidak ada prestasi untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Achievements;
