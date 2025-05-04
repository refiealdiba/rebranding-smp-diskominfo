import { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, XCircle } from "lucide-react";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    thumbnail: "",
  });

  const [newPhoto, setNewPhoto] = useState({
    title: "",
    thumbnail: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/photos");
      setPhotos(res.data);
    } catch (error) {
      console.error("Gagal ambil foto:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus foto ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/photos/${id}`);
        setPhotos(photos.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Gagal hapus foto:", error);
      }
    }
  };

  const handleEdit = (photo) => {
    setEditId(photo.id);
    setEditData({
      title: photo.title,
      thumbnail: photo.thumbnail,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/photos/${editId}`, editData);
      setPhotos(
        photos.map((p) => (p.id === editId ? { ...p, ...editData } : p))
      );
      setEditId(null);
    } catch (error) {
      console.error("Gagal update foto:", error);
    }
  };

  const handleAddPhoto = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/photos",
        newPhoto
      );
      setPhotos([...photos, res.data]);
      setNewPhoto({ title: "", thumbnail: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Gagal tambah foto:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-smporange mb-4">
        Kelola Album Foto
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
        {showAddForm ? "Tutup Form" : "Tambah Album"}
      </button>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Judul Album"
              value={newPhoto.title}
              onChange={(e) =>
                setNewPhoto({ ...newPhoto, title: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              value={newPhoto.thumbnail}
              onChange={(e) =>
                setNewPhoto({ ...newPhoto, thumbnail: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleAddPhoto}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Simpan Album
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
                Thumbnail
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {photos.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-yellow-50 transition-all duration-200"
              >
                <td className="px-6 py-4">
                  {editId === p.id ? (
                    <input
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    <span className="font-medium">{p.title}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editId === p.id ? (
                    <input
                      value={editData.thumbnail}
                      onChange={(e) =>
                        setEditData({ ...editData, thumbnail: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    <img
                      src={p.thumbnail}
                      alt="thumbnail"
                      className="w-12 h-12 object-cover rounded shadow"
                    />
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {editId === p.id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Simpan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {photos.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Tidak ada album foto.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Photos;
