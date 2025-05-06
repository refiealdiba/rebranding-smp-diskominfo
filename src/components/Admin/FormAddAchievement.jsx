import { useState } from "react";
import { supabase } from "../../config/db";
import { ImagePlus, UploadCloud } from "lucide-react";

const FormAddAchievement = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      if (!image) throw new Error("Pilih gambar terlebih dahulu!");

      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("achievement-photos")
        .upload(filePath, image);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("achievement-photos").getPublicUrl(filePath);

      setImageUrl(publicUrl);

      const { error } = await supabase.from("achievements").insert([
        {
          title,
          photo: publicUrl,
        },
      ]);

      if (error) throw error;

      alert("Prestasi berhasil ditambahkan!");
      setTitle("");
      setImage(null);
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
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {image && (
                <span className="text-sm text-gray-600 italic">
                  {image.name}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 bg-smporange hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UploadCloud size={18} />
            {uploading ? "Mengupload..." : "Upload Prestasi"}
          </button>
        </form>

        {imageUrl && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Pratinjau Foto:
            </h3>
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

export default FormAddAchievement;
