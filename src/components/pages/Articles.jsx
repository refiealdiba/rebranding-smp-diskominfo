import { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, XCircle } from "lucide-react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });

  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/articles");
      setArticles(res.data);
    } catch (error) {
      console.error("Gagal ambil artikel:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus artikel ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/articles/${id}`);
        setArticles(articles.filter((a) => a.id !== id));
      } catch (error) {
        console.error("Gagal hapus artikel:", error);
      }
    }
  };

  const handleEdit = (article) => {
    setEditId(article.id);
    setEditData({
      title: article.title,
      content: article.content,
      thumbnail: article.thumbnail,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/articles/${editId}`, editData);
      setArticles(
        articles.map((a) => (a.id === editId ? { ...a, ...editData } : a))
      );
      setEditId(null);
    } catch (error) {
      console.error("Gagal update artikel:", error);
    }
  };

  const handleAddArticle = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/articles",
        newArticle
      );
      setArticles([...articles, res.data]);
      setNewArticle({ title: "", content: "", thumbnail: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Gagal tambah artikel:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-smporange mb-4">Kelola Artikel</h2>

      {/* Tombol Buka/Tutup Form Tambah */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className={`mb-4 flex items-center gap-2 px-4 py-2 rounded font-medium text-white transition ${
          showAddForm
            ? "bg-red-500 hover:bg-red-600"
            : "bg-smporange hover:bg-orange-600"
        }`}
      >
        {showAddForm ? <XCircle size={20} /> : <PlusCircle size={20} />}
        {showAddForm ? "Tutup Form" : "Tambah Artikel"}
      </button>

      {/* Form Tambah Artikel */}
      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Judul"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              value={newArticle.thumbnail}
              onChange={(e) =>
                setNewArticle({ ...newArticle, thumbnail: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Konten"
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleAddArticle}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Simpan Artikel
          </button>
        </div>
      )}

      {/* Tabel Artikel */}
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
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Author
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
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
                  <img
                    src={a.thumbnail}
                    alt="thumb"
                    className="w-12 h-12 object-cover rounded shadow"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {a.author || "admin"}
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
            {articles.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada artikel.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Articles;
