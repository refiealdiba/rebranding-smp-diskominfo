import { useEffect, useState } from "react";
import { PlusCircle, XCircle } from "lucide-react";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/articles";
import FormAddArticle from "../../components/Admin/FormAddArticle";


const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
  });

  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const data = await getArticles();
    setArticles(data || []);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus artikel ini?")) {
      const res = await deleteArticle(id);
      if (res !== null) {
        setArticles(articles.filter((a) => a.id !== id));
      }
    }
  };

  const handleEdit = (article) => {
    setEditId(article.id);
    setEditData({
      title: article.title,
      content: article.content,
    });
  };

  const handleSave = async () => {
    const res = await updateArticle(editId, editData.title, editData.content);
    if (res !== null) {
      setArticles(
        articles.map((a) => (a.id === editId ? { ...a, ...editData } : a))
      );
      setEditId(null);
    }
  };

  const handleAddArticle = async () => {
    const res = await createArticle(newArticle.title, newArticle.content);
    if (res !== null) {
      const inserted = Array.isArray(res) ? res[0] : res;
      setArticles([inserted, ...articles]);
      setNewArticle({ title: "", content: "" });
      setShowAddForm(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-smporange mb-4">Kelola Artikel</h2>
      <FormAddArticle></FormAddArticle>
      {/* <button
        onClick={() => setShowAddForm(!showAddForm)}
        className={`mb-4 flex items-center gap-2 px-4 py-2 rounded font-medium text-white transition ${
          showAddForm
            ? "bg-red-500 hover:bg-red-600"
            : "bg-smporange hover:bg-orange-600"
        }`}
      >
        {showAddForm ? <XCircle size={20} /> : <PlusCircle size={20} />}
        {showAddForm ? "Tutup Form" : "Tambah Artikel"}
      </button> */}

      {/* {showAddForm && (
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
      )} */}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 shadow rounded-2xl overflow-hidden">
          <thead className="bg-smporange text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Judul
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
