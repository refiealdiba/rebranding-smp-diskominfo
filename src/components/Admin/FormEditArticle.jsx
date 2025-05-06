import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../config/db";
import { ImagePlus, UploadCloud } from "lucide-react";
import Swal from "sweetalert2";

const FormEditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            const { data, error } = await supabase
                .from("articles")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                Swal.fire("Gagal", "Gagal memuat artikel.", "error");
                console.error(error);
                return;
            }

            setTitle(data.title);
            setContent(data.content);
            setImageUrl(data.thumbnail);
        };

        fetchArticle();
    }, [id]);

    // Untuk preview gambar setelah memilih file baru
    useEffect(() => {
        if (image) {
            const previewUrl = URL.createObjectURL(image);
            setImageUrl(previewUrl);

            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [image]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const confirmed = await Swal.fire({
            title: "Konfirmasi Update",
            text: "Apakah Anda yakin ingin memperbarui artikel ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Update",
            cancelButtonText: "Batal",
        });

        if (!confirmed.isConfirmed) return;

        setUploading(true);

        try {
            let newImageUrl = imageUrl;

            if (image) {
                const fileExt = image.name.split(".").pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("thumbnail-article")
                    .upload(filePath, image, { upsert: true });

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from("thumbnail-article").getPublicUrl(filePath);

                newImageUrl = data.publicUrl;
            }

            await supabase
                .from("articles")
                .update({
                    title,
                    content,
                    thumbnail: newImageUrl,
                })
                .eq("id", id);

            if (error) throw error;

            await Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Artikel berhasil diperbarui!",
            });

            navigate("/admin/berita");
        } catch (error) {
            Swal.fire("Gagal", error.message, "error");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-10 font-inter bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold text-smporange flex items-center gap-2">
                    <UploadCloud className="w-6 h-6" />
                    Edit Artikel
                </h2>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Judul Artikel
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-smporange"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Konten Artikel
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-smporange"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thumbnail Artikel
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer flex items-center gap-2 bg-smporange text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                                <ImagePlus size={18} />
                                <span>{image ? image.name : "Ganti Gambar"}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="Thumbnail"
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="flex items-center gap-2 bg-smporange hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <UploadCloud size={18} />
                        {uploading ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormEditArticle;
