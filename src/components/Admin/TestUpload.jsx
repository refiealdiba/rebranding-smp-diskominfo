import { useState } from "react";
import { supabase } from "../../config/db";

const TestUpload = () => {
    const [title, setTitle] = useState("testing");
    const [content, setContent] = useState("testing");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            setUploading(true);

            if (!image) {
                throw new Error("Pilih gambar terlebih dahulu!");
            }

            // Generate nama file unik
            const fileExt = image.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload gambar ke Supabase storage
            let { error: uploadError } = await supabase.storage
                .from("thumbnail-article") // nama bucket Anda
                .upload(filePath, image);

            if (uploadError) {
                throw uploadError;
            }

            // Dapatkan URL publik
            const {
                data: { publicUrl },
            } = supabase.storage.from("thumbnail-article").getPublicUrl(filePath);

            setImageUrl(publicUrl);

            // Simpan data artikel ke database
            const { error } = await supabase.from("articles").insert([
                {
                    title: title,
                    content: content,
                    thumbnail: publicUrl,
                },
            ]);

            alert("Upload berhasil!");
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };
    return (
        <div>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
            <input
                type="text"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                value={content}
            />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default TestUpload;
