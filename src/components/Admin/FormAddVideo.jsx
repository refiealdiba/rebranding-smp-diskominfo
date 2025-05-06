import { useState } from "react";
import { supabase } from "../../config/db";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import Swal from "sweetalert2"; // Tambahkan ini

const FormAddVideo = () => {
    const [title, setTitle] = useState("");
    const [linkEmbed, setLinkEmbed] = useState("");
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            const { error } = await supabase.from("videos").insert([
                {
                    title,
                    link_embed: linkEmbed,
                },
            ]);
            if (error) throw error;

            Swal.fire({
                title: "Berhasil!",
                text: "Video berhasil ditambahkan.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/admin/galeriVideo");
            });

            setTitle("");
            setLinkEmbed("");
        } catch (error) {
            Swal.fire({
                title: "Gagal",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-10 font-inter bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow p-8 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-smporange mb-6 flex items-center gap-2">
                    <UploadCloud /> Tambah Video
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Judul Video"
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-smporange"
                    />
                    <input
                        type="text"
                        value={linkEmbed}
                        onChange={(e) => setLinkEmbed(e.target.value)}
                        placeholder="Link Embed (YouTube)"
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-smporange"
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-smporange text-white px-6 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
                    >
                        {uploading ? "Menyimpan..." : "Simpan Video"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormAddVideo;
