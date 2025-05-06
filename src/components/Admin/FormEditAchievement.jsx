import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../config/db";
import { ImagePlus, UploadCloud } from "lucide-react";
import Swal from "sweetalert2";

const FormEditAchievement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [currentPhoto, setCurrentPhoto] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(""); // Untuk preview gambar baru
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchAchievement = async () => {
            const { data, error } = await supabase
                .from("achievements")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Gagal memuat data prestasi.",
                    confirmButtonColor: "#ef4444",
                });
                return;
            }

            setTitle(data.title);
            setCurrentPhoto(data.photo);
        };

        fetchAchievement();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        if (file) {
            const localPreview = URL.createObjectURL(file);
            setPreviewUrl(localPreview);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let photoUrl = currentPhoto;

            if (newImage) {
                const ext = newImage.name.split(".").pop();
                const filename = `${Date.now()}.${ext}`;
                const { error: uploadError } = await supabase.storage
                    .from("photo-achievement")
                    .upload(filename, newImage);

                if (uploadError) throw uploadError;

                const {
                    data: { publicUrl },
                } = supabase.storage.from("photo-achievement").getPublicUrl(filename);

                photoUrl = publicUrl;
            }

            const { error } = await supabase
                .from("achievements")
                .update({
                    title,
                    photo: photoUrl,
                })
                .eq("id", id);

            if (error) throw error;

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Prestasi berhasil diperbarui.",
                confirmButtonColor: "#f97316",
            });

            navigate("/admin/galeriPrestasi");
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: err.message,
                confirmButtonColor: "#ef4444",
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-10 font-inter bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold text-smporange flex items-center gap-2">
                    <UploadCloud className="w-6 h-6" />
                    Edit Prestasi
                </h2>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ganti Foto (opsional)
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer flex items-center gap-2 bg-smporange text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                                <ImagePlus size={18} />
                                <span>{newImage ? newImage.name : "Pilih Gambar Baru"}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>

                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded-md shadow"
                                />
                            ) : currentPhoto ? (
                                <img
                                    src={currentPhoto}
                                    alt="Current"
                                    className="w-20 h-20 object-cover rounded-md shadow"
                                />
                            ) : null}
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

export default FormEditAchievement;
