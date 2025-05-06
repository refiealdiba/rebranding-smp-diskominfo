import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPhotoById } from "../../services/photos";
import { supabase } from "../../config/db";

const PhotoDetail = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [details, setDetails] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [detailFiles, setDetailFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchPhotoDetail = async () => {
            try {
                const data = await getPhotoById(id);
                setPhoto(data);
                setDetails(data.photo_details || []);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };

        fetchPhotoDetail();
    }, [id]);

    const handleDelete = async (detailId) => {
        const confirm = window.confirm("Yakin ingin menghapus foto ini?");
        if (!confirm) return;

        try {
            const { error } = await supabase.from("photo_details").delete().eq("id", detailId);

            if (error) throw error;

            setDetails((prev) => prev.filter((item) => item.id !== detailId));
        } catch (error) {
            console.error("Gagal menghapus foto:", error.message);
            alert("Gagal menghapus foto detail.");
        }
    };

    const uploadImageToStorage = async (file) => {
        const ext = file.name.split(".").pop();
        const filename = `photos/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const { error } = await supabase.storage.from("photo-gallery").upload(filename, file);
        if (error) throw error;
        const { data } = supabase.storage.from("photo-gallery").getPublicUrl(filename);
        return data.publicUrl;
    };

    const handleUploadDetail = async () => {
        if (!detailFiles.length) return;

        setIsUploading(true);
        try {
            const uploads = await Promise.all(
                detailFiles.map((file) => uploadImageToStorage(file))
            );

            const insertData = uploads.map((url) => ({
                photo_id: id,
                photo: url,
            }));

            const { data: inserted, error } = await supabase
                .from("photo_details")
                .insert(insertData)
                .select();

            if (error) throw error;

            setDetails((prev) => [...prev, ...inserted]);
            setDetailFiles([]);
            setShowModal(false);
        } catch (error) {
            console.error("Upload gagal:", error.message);
            alert("Gagal mengunggah foto detail.");
        } finally {
            setIsUploading(false);
        }
    };

    const removeDetailFile = (index) => {
        setDetailFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 font-inter">
            <h1 className="text-xl font-bold mb-4 text-smporange">Detail Album Foto</h1>

            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-semibold mb-2">{photo?.title}</h2>
                <img
                    src={photo?.thumbnail}
                    alt={photo?.title}
                    className="w-full max-w-md h-auto object-cover rounded-md"
                />

                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-smporange text-white px-4 py-2 rounded hover:bg-orange-600"
                    >
                        Tambah Foto Detail
                    </button>
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        {editMode ? "Selesai" : "Edit"}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-md font-semibold mb-3">Foto-Foto Detail</h3>
                {details.length === 0 ? (
                    <p className="text-gray-500">Belum ada foto detail.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {details.map((item) => (
                            <div key={item.id} className="relative border rounded overflow-hidden">
                                <img
                                    src={item.photo}
                                    alt={`Foto detail ${item.id}`}
                                    className="w-full h-32 object-cover"
                                />
                                {editMode && (
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Tambah Foto Detail */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/5 backdrop-blur-sm transition duration-300">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative animate-fade-in">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Foto Detail</h2>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setDetailFiles([...e.target.files])}
                            className="mb-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-smporange file:text-white hover:file:bg-orange-600"
                            disabled={isUploading}
                        />

                        {detailFiles.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {Array.from(detailFiles).map((file, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-full h-24 object-cover rounded shadow"
                                        />
                                        <button
                                            onClick={() => removeDetailFile(index)}
                                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleUploadDetail}
                                className="bg-smporange hover:bg-orange-600 text-white px-5 py-2 rounded-full font-semibold transition"
                                disabled={isUploading}
                            >
                                {isUploading ? "Mengunggah..." : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoDetail;
