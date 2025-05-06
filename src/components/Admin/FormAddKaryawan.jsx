import { useState, useEffect } from "react";
import { supabase } from "../../config/db";
import { ImagePlus, UploadCloud } from "lucide-react";
import { getLastIdEmployee } from "../../services/employee";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormAddEmployee = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // New state
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");

    useEffect(() => {
        if (image) {
            const localUrl = URL.createObjectURL(image);
            setPreviewUrl(localUrl);

            return () => URL.revokeObjectURL(localUrl); // Cleanup
        }
    }, [image]);

    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            setUploading(true);
            if (!image) throw new Error("Pilih gambar terlebih dahulu!");

            const fileExt = image.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from("employees")
                .upload(filePath, image);

            if (uploadError) throw uploadError;

            const {
                data: { publicUrl },
            } = supabase.storage.from("employees").getPublicUrl(filePath);

            setImageUrl(publicUrl);

            const { error } = await supabase.from("employees").insert([
                {
                    id: (await getLastIdEmployee()) + 1,
                    name,
                    position,
                    photo: publicUrl,
                },
            ]);

            if (error) throw error;

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Data karyawan berhasil diupload.",
            });

            // Reset form
            setName("");
            setPosition("");
            setImage(null);
            setPreviewUrl(null);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: error.message,
            });
        } finally {
            setUploading(false);
            navigate("/admin/guruKaryawan");
        }
    };

    return (
        <div className="px-4 py-10 font-inter bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold text-smporange flex items-center gap-2">
                    <UploadCloud className="w-6 h-6" />
                    Tambah Data Guru/Karyawan
                </h2>

                <form onSubmit={handleUpload} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan nama"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-smporange"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Posisi
                        </label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="Masukkan posisi/jabatan"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-smporange"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Foto Karyawan
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer flex items-center gap-2 bg-smporange text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                                <ImagePlus size={18} />
                                <span>{image ? image.name : "Pilih Gambar"}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                            {image && (
                                <span className="text-sm text-gray-600 italic">{image.name}</span>
                            )}
                        </div>
                    </div>

                    {previewUrl && (
                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Pratinjau Gambar:</h3>
                            <img
                                src={previewUrl}
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
                        {uploading ? "Mengupload..." : "Upload Data"}
                    </button>
                </form>

                {imageUrl && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Foto Terupload:</h3>
                        <img
                            src={imageUrl}
                            alt="Uploaded"
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
            </div>
        </div>
    );
};

export default FormAddEmployee;
