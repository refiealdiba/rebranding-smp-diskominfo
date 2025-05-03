const BannerImage = ({ image }) => {
    return (
        <div className="relative">
            <div className="bg-white shadow-md font-bold rounded-xl absolute top-10 -right-10">
                <div className="flex items-center px-3 py-3 gap-5">
                    <img
                        src="bapakagus.png"
                        alt=""
                        className="w-15 h-15 rounded-full object-cover object-top"
                    />
                    <div className="flex flex-col">
                        <p className="text-sm">Agus Supriyanto, S.Pd., M.Kom.</p>
                        <p className="text-xs font-medium text-smpgray">
                            Kepala Sekolah SMP Negeri 20 Semarang
                        </p>
                    </div>
                </div>
            </div>
            <img src="bannerimage.png" alt="" className="object-cover object-top" />
            <div className="bg-white shadow-md font-bold rounded-xl italic absolute text-base px-3 py-5 -left-10  bottom-20">
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
