import { useState } from "react";
import { supabase } from "../../config/db";

const FormAddArticle = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            setUploading(true);

            if (!image) {
                throw new Error("Pilih gambar terlebih dahulu!");
            }

            const fileExt = image.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from("thumbnail-article")
                .upload(filePath, image);

            if (uploadError) {
                throw uploadError;
            }

            const {
                data: { publicUrl },
            } = supabase.storage.from("thumbnail-article").getPublicUrl(filePath);

            setImageUrl(publicUrl);

            const { error } = await supabase.from("articles").insert([
                {
                    title: title,
                    content: content,
                    thumbnail: publicUrl,
                },
            ]);

            if (error) throw error;

            alert("Upload berhasil!");
            setTitle("");
            setContent("");
            setImage(null);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-10 font-inter">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-3xl mx-auto">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-smporange mb-6">
                    Tambah Artikel
                </h2>
                <form onSubmit={handleUpload} className="flex flex-col gap-5">
                    <input
                        type="text"
                        placeholder="Judul Artikel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                    />
                    <textarea
                        placeholder="Konten Artikel"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        rows="6"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        disabled={uploading}
                        className="border rounded px-4 py-2 w-full"
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-max bg-smporange hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded"
                    >
                        {uploading ? "Mengupload..." : "Upload"}
                    </button>
                </form>

                {imageUrl && (
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-700 mb-2">Gambar yang diupload:</h3>
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="w-60 h-auto object-cover rounded shadow"
                        />
                        <p className="mt-2 text-sm text-gray-600 break-all">
                            URL Gambar: {imageUrl}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormAddArticle;
