import { useState } from "react";
import { createComplaint } from "../../services/complaints";
import { sanitizeText } from "../../middleware/sanitizeText";
import sanitizeHtml from "sanitize-html-react";

const PengaduanForm = () => {
    const [form, setForm] = useState({
        nama: "",
        email: "",
        pesan: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // const sanitizedValue = sanitizeText(value); // 🔐 Sanitize input here
        const sanitizedValue = sanitizeHtml(value);
        setForm((prev) => ({ ...prev, [name]: sanitizedValue }));
    };

    const handleSubmitComplaint = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const { nama, email, pesan } = form;

        if (!nama || !email || !pesan) {
            setError("Semua field harus diisi.");
            setLoading(false);
            return;
        }

        try {
            await createComplaint(nama, email, pesan);
            setSuccess("Pengaduan berhasil dikirim.");
            setForm({ nama: "", email: "", pesan: "" });
        } catch (err) {
            setError("Gagal mengirim pengaduan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-inter max-w-xl mx-auto bg-white drop-shadow-2xl rounded-2xl p-6 space-y-10">
            <h2 className="font-semibold max-w-sm text-base text-center">
                Silakan isi form di bawah ini untuk melakukan pengaduan
            </h2>
            <form className="space-y-4 text-sm" onSubmit={handleSubmitComplaint}>
                <div className="flex flex-col">
                    <label htmlFor="nama" className="mb-1 font-medium">
                        Nama
                    </label>
                    <input
                        type="text"
                        name="nama"
                        id="nama"
                        value={form.nama}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-smporange font-normal"
                        placeholder="Masukkan nama Anda"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-smporange font-normal"
                        placeholder="contoh@email.com"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pesan" className="mb-1 font-medium">
                        Pesan
                    </label>
                    <textarea
                        name="pesan"
                        id="pesan"
                        rows={6}
                        value={form.pesan}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-smporange font-normal"
                        placeholder="Tuliskan pesan pengaduan Anda..."
                    ></textarea>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-smporange text-white px-4 py-2 rounded-md hover:bg-smpdarkorange transition-colors text-sm disabled:opacity-50"
                    >
                        {loading ? "Mengirim..." : "Kirim"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PengaduanForm;
