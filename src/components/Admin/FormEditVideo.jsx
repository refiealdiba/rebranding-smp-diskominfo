import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../config/db";
import { Pencil } from "lucide-react";
import Swal from "sweetalert2"; // Tambahkan ini

const FormEditVideo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [linkEmbed, setLinkEmbed] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchVideo = async () => {
            const { data, error } = await supabase
                .from("videos")
                .select("title, link_embed")
                .eq("id", id)
                .single();

            if (error) {
                Swal.fire("Gagal", "Gagal mengambil data video", "error");
            } else {
                setTitle(data.title);
                setLinkEmbed(data.link_embed);
            }
            setLoading(false);
        };

        fetchVideo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Simpan Perubahan?",
            text: "Perubahan pada video akan disimpan.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setSaving(true);
                try {
                    const { error } = await supabase
                        .from("videos")
                        .update({ title, link_embed: linkEmbed })
                        .eq("id", id);

                    if (error) throw error;

                    Swal.fire({
                        title: "Berhasil!",
                        text: "Video berhasil diperbarui.",
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        navigate("/admin/galeriVideo");
                    });
                } catch (error) {
                    Swal.fire("Gagal", error.message, "error");
                } finally {
                    setSaving(false);
                }
            }
        });
    };

    if (loading) return <p className="p-10">Memuat data...</p>;

    return (
        <div className="p-10 font-inter bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow p-8 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-smporange mb-6 flex items-center gap-2">
                    <Pencil /> Edit Video
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
                        disabled={saving}
                        className="bg-smporange text-white px-6 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
                    >
                        {saving ? "Menyimpan..." : "Update Video"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormEditVideo;
