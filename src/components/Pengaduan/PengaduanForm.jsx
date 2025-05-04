const PengaduanForm = () => {
    return (
        <div className="font-inter max-w-xl mx-auto bg-white drop-shadow-2xl rounded-2xl p-6 space-y-10">
            <h2 className="font-semibold max-w-sm text-base text-center">
                Silakan isi form di bawah ini untuk melakukan pengaduan
            </h2>
            <form className="space-y-4 text-sm">
                <div className="flex flex-col">
                    <label htmlFor="nama" className="mb-1 font-medium">
                        Nama
                    </label>
                    <input
                        type="text"
                        name="nama"
                        id="nama"
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
                        className="border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-smporange font-normal"
                        placeholder="Tuliskan pesan pengaduan Anda..."
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-smporange text-white px-4 py-2 rounded-md hover:bg-smpdarkorange transition-colors text-sm"
                    >
                        Kirim
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PengaduanForm;
