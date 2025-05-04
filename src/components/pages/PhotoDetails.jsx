import { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, XCircle } from "lucide-react";

const PhotoDetails = () => {
  const [details, setDetails] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ gallery_id: "", photo: "" });
  const [newDetail, setNewDetail] = useState({ gallery_id: "", photo: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/photo-details");
      setDetails(res.data);
    } catch (error) {
      console.error("Gagal mengambil detail foto:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus detail ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/photo-details/${id}`);
        setDetails(details.filter((d) => d.id !== id));
      } catch (error) {
        console.error("Gagal menghapus detail:", error);
      }
    }
  };

  const handleEdit = (detail) => {
    setEditId(detail.id);
    setEditData({
      gallery_id: detail.gallery_id,
      photo: detail.photo,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/photo-details/${editId}`,
        editData
      );
      setDetails(
        details.map((d) => (d.id === editId ? { ...d, ...editData } : d))
      );
      setEditId(null);
    } catch (error) {
      console.error("Gagal menyimpan perubahan:", error);
    }
  };

  const handleAddDetail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/photo-details",
        newDetail
      );
      setDetails([...details, res.data]);
      setNewDetail({ gallery_id: "", photo: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Gagal menambahkan detail:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-smporange mb-4">
        Kelola Detail Foto
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
        {showAddForm ? "Tutup Form" : "Tambah Detail Foto"}
      </button>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Gallery ID"
              value={newDetail.gallery_id}
              onChange={(e) =>
                setNewDetail({ ...newDetail, gallery_id: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="URL Foto"
              value={newDetail.photo}
              onChange={(e) =>
                setNewDetail({ ...newDetail, photo: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleAddDetail}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Simpan Detail
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 shadow rounded-2xl overflow-hidden">
          <thead className="bg-smporange text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Gallery ID
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
            {details.map((d) => (
              <tr
                key={d.id}
                className="border-b hover:bg-yellow-50 transition-all duration-200"
              >
                <td className="px-6 py-4 font-medium">
                  {editId === d.id ? (
                    <input
                      value={editData.gallery_id}
                      onChange={(e) =>
                        setEditData({ ...editData, gallery_id: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    d.gallery_id
                  )}
                </td>
                <td className="px-6 py-4">
                  {editId === d.id ? (
                    <input
                      value={editData.photo}
                      onChange={(e) =>
                        setEditData({ ...editData, photo: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    <img
                      src={d.photo}
                      alt="detail"
                      className="w-12 h-12 object-cover rounded shadow"
                    />
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {editId === d.id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Simpan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(d)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {details.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Tidak ada detail foto.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhotoDetails;
