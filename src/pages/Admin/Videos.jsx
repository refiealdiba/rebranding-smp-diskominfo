import { useEffect, useState } from "react";
import { PlusCircle, XCircle } from "lucide-react";
import {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../../services/videos";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", url: "" });
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const data = await getVideos();
    setVideos(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus video ini?")) {
      const res = await deleteVideo(id);
      if (res) setVideos(videos.filter((v) => v.id !== id));
    }
  };

  const handleEdit = (video) => {
    setEditId(video.id);
    setEditData({ title: video.title, url: video.url });
  };

  const handleSave = async () => {
    const res = await updateVideo(editId, editData.title, editData.url);
    if (res) {
      setVideos(
        videos.map((v) => (v.id === editId ? { ...v, ...editData } : v))
      );
      setEditId(null);
    }
  };

  const handleAdd = async () => {
    if (!newVideo.title.trim()) return alert("Judul video tidak boleh kosong.");
    const res = await createVideo(newVideo.title, newVideo.url);
    if (res) {
      await loadVideos();
      setNewVideo({ title: "", url: "" });
      setShowForm(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-smporange mb-6">Kelola Video</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className={`mb-4 flex items-center gap-2 px-4 py-2 rounded font-medium text-white transition ${
          showForm
            ? "bg-red-500 hover:bg-red-600"
            : "bg-smporange hover:bg-orange-600"
        }`}
      >
        {showForm ? <XCircle size={20} /> : <PlusCircle size={20} />}
        {showForm ? "Tutup Form" : "Tambah Video"}
      </button>

      {showForm && (
        <div className="mb-6 bg-slate-50 p-4 rounded shadow">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Judul video"
              value={newVideo.title}
              onChange={(e) =>
                setNewVideo({ ...newVideo, title: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="URL video"
              value={newVideo.url}
              onChange={(e) =>
                setNewVideo({ ...newVideo, url: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Simpan
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
              <th className="px-6 py-3 text-left text-sm font-semibold">URL</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v) => (
              <tr
                key={v.id}
                className="border-b hover:bg-yellow-50 transition-all duration-200"
              >
                <td className="px-6 py-4">
                  {editId === v.id ? (
                    <input
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    <span className="font-medium">{v.title}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editId === v.id ? (
                    <input
                      value={editData.url}
                      onChange={(e) =>
                        setEditData({ ...editData, url: e.target.value })
                      }
                      className="border px-3 py-1 w-full rounded-md"
                    />
                  ) : (
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {v.url}
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {editId === v.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(v)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {videos.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Tidak ada video untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Videos;
