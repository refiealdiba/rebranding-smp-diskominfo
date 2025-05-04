const BannerImage = () => {
    return (
        <div className="relative w-full max-w-md sm:max-w-lg mx-auto">
            {/* Card atas */}
            <div className="bg-white shadow-md font-bold rounded-xl absolute top-4 right-4 sm:top-10 sm:-right-10 z-10 w-64 sm:w-auto">
                <div className="flex items-center px-3 py-3 gap-3 sm:gap-5">
                    <img
                        src="bapakagus.png"
                        alt=""
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top"
                    />
                    <div className="flex flex-col">
                        <p className="text-sm">Agus Supriyanto, S.Pd., M.Kom.</p>
                        <p className="text-xs font-medium text-smpgray">
                            Kepala Sekolah SMP Negeri 20 Semarang
                        </p>
                    </div>
                </div>
            </div>

            {/* Gambar utama */}
            <img
                src="bannerimage.png"
                alt=""
                className="w-full object-cover object-top rounded-xl"
            />

            {/* Quote bawah */}
            <div className="bg-white shadow-md font-bold rounded-xl italic absolute bottom-4 left-4 sm:-left-10 sm:bottom-20 text-sm sm:text-base px-3 py-4 sm:py-5 max-w-xs sm:max-w-sm">
                “ Belajar Itu Menyenangkan
                <br />
                kuncinya jangan pernah
                <br />
                menyerah oleh apapun itu ”
            </div>
        </div>
    );
};

export default BannerImage;
