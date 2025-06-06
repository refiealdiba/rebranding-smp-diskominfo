import { useState } from "react";
import { supabase } from "../../config/db";
import { ImagePlus, UploadCloud } from "lucide-react";
import { getLastAchievementId } from "../../services/achievements";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormAddAchievement = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(""); // for preview
    const [title, setTitle] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const localUrl = URL.createObjectURL(file);
            setImageUrl(localUrl);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            setUploading(true);
            if (!image) throw new Error("Pilih gambar terlebih dahulu!");

            const fileExt = image.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("photo-achievement")
                .upload(filePath, image);

            if (uploadError) throw uploadError;

            const {
                data: { publicUrl },
            } = supabase.storage.from("photo-achievement").getPublicUrl(filePath);

            const { error } = await supabase.from("achievements").insert([
                {
                    id: (await getLastAchievementId()) + 1,
                    title,
                    photo: publicUrl,
                },
            ]);

            if (error) throw error;

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Prestasi berhasil ditambahkan.",
                confirmButtonColor: "#f97316",
            });

            setTitle("");
            setImage(null);
            setImageUrl("");
            navigate("/admin/galeriPrestasi");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: error.message,
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
                    Tambah Prestasi
                </h2>

                <form onSubmit={handleUpload} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Masukkan judul prestasi"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-smporange"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Foto Prestasi
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer flex items-center gap-2 bg-smporange text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                                <ImagePlus size={18} />
                                <span>{image ? image.name : "Pilih Gambar"}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                            {image && (
                                <span className="text-sm text-gray-600 italic">{image.name}</span>
                            )}
                        </div>
                    </div>

                    {imageUrl && (
                        <div className="mt-6 border-t pt-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Pratinjau Foto:</h3>
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-60 h-auto object-cover rounded-lg shadow"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={uploading}
                        className="flex items-center gap-2 bg-smporange hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <UploadCloud size={18} />
                        {uploading ? "Mengupload..." : "Upload Prestasi"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormAddAchievement;
