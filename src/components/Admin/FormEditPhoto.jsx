import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../config/db";
import { ImagePlus, UploadCloud } from "lucide-react";
import Swal from "sweetalert2";

const FormEditPhoto = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const { data, error } = await supabase
                    .from("photos")
                    .select("*")
                    .eq("id", id)
                    .single();
                if (error) throw error;

                setTitle(data.title);
                setImageUrl(data.thumbnail);
            } catch (error) {
                console.error("Gagal mengambil data album:", error);
                Swal.fire("Gagal", "Tidak dapat memuat data album.", "error");
            }
        };

        fetchAlbum();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: "Simpan perubahan?",
            text: "Perubahan akan langsung diterapkan ke album.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, simpan",
            cancelButtonText: "Batal",
        });

        if (!result.isConfirmed) return;

        try {
            setUploading(true);

            if (!title.trim()) throw new Error("Judul album tidak boleh kosong!");

            let updatedImageUrl = imageUrl;

            if (image) {
                const fileExt = image.name.split(".").pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("photo-gallery")
                    .upload(filePath, image);

                if (uploadError) throw uploadError;

                const {
                    data: { publicUrl },
                } = supabase.storage.from("photo-gallery").getPublicUrl(filePath);

                updatedImageUrl = publicUrl;
            }

            const { error } = await supabase
                .from("photos")
                .update({
                    title,
                    thumbnail: updatedImageUrl,
                })
                .eq("id", id);

            if (error) throw error;

            await Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Album berhasil diperbarui.",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/admin/galeriFoto");
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
                    Edit Album
                </h2>
                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Album
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Masukkan Judul Album"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-smporange"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thumbnail
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer flex items-center gap-2 bg-smporange text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                                <ImagePlus size={18} />
                                <span>{image ? image.name : "Ganti Gambar"}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setImage(file);
                                            setImageUrl(URL.createObjectURL(file)); // tambahkan preview
                                        }
                                    }}
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
                                alt="Thumbnail"
                                className="w-60 h-auto object-cover rounded-lg shadow"
                            />
                            <p className="mt-2 text-sm text-gray-500 break-all">
                                URL:{" "}
                                <a
                                    href={imageUrl}
                                    className="text-blue-600 underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {imageUrl}
                                </a>
                            </p>
                        </div>
                    )}

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

export default FormEditPhoto;
