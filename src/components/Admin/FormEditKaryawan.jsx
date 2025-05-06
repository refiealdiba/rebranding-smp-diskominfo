import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../config/db";
import { ImagePlus, UploadCloud } from "lucide-react";

const FormEditEmployee = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");

    // Ambil data jika sedang dalam mode edit
    useEffect(() => {
        if (id) {
            const fetchEmployee = async () => {
                const { data, error } = await supabase
                    .from("employees")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    alert("Gagal mengambil data!");
                    return;
                }

                setName(data.name);
                setPosition(data.position);
                setImageUrl(data.photo);
            };

            fetchEmployee();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let photoUrl = imageUrl;

            // Jika ada gambar baru diunggah
            if (image) {
                const fileExt = image.name.split(".").pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = fileName;

                const { error: uploadError } = await supabase.storage
                    .from("employees")
                    .upload(filePath, image);

                if (uploadError) throw uploadError;

                const {
                    data: { publicUrl },
                } = supabase.storage.from("employees").getPublicUrl(filePath);

                photoUrl = publicUrl;
            }

            if (id) {
                // Update data
                const { error } = await supabase
                    .from("employees")
                    .update({ name, position, photo: photoUrl })
                    .eq("id", id);

                if (error) throw error;

                alert("Data berhasil diupdate!");
            } else {
                // Tambah data baru
                const { data: last, error: errLast } = await supabase
                    .from("employees")
                    .select("id")
                    .order("id", { ascending: false })
                    .limit(1)
                    .single();

                const newId = last ? last.id + 1 : 1;

                const { error } = await supabase.from("employees").insert([
                    {
                        id: newId,
                        name,
                        position,
                        photo: photoUrl,
                    },
                ]);

                if (error) throw error;

                alert("Upload berhasil!");
            }

            navigate("/admin/guruKaryawan");
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-10 font-inter bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold text-smporange flex items-center gap-2">
                    <UploadCloud className="w-6 h-6" />
                    {id ? "Edit Data Guru/Karyawan" : "Tambah Data Guru/Karyawan"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                            {id ? "Ubah Foto (opsional)" : "Foto Karyawan"}
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
                        </div>
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Pratinjau"
                                className="mt-2 w-48 h-auto object-cover rounded-lg shadow"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="flex items-center gap-2 bg-smporange hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <UploadCloud size={18} />
                        {uploading ? "Menyimpan..." : id ? "Simpan Perubahan" : "Upload Data"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormEditEmployee;
