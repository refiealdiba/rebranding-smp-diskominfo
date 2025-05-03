const Sambutan = () => {
    return (
        <div className="flex flex-col items-center mt-20 gap-17">
            <div className="font-poppins font-bold text-4xl">
                <h1 className="max-w-md text-center">
                    Profil <span className="text-smporange">SMP Negeri 20 Semarang</span>
                </h1>
            </div>
            <div className="flex justify-center items-center gap-10">
                <img
                    src="bapakagus.png"
                    alt="Bapak Agus"
                    className="object-cover object-top w-50 rounded-xl"
                />
                <div className="flex flex-col gap-5">
                    <p className="text-smpgray text-sm font-medium font-poppins max-w-2xl">
                        Assalamu'alaikum Warohmatullahi Wabarokatuh.
                    </p>
                    <p className="text-smpgray text-sm font-medium font-poppins max-w-2xl  leading-6">
                        Segala puji dan rasa syukur kehadirat Allah SWT, Tuhan Yang Maha Esa oleh
                        karena rahmat dan hidayahNya sehingga website SMP Negeri 20 Semarang ini
                        dapat kami perbaharui untuk semakin berkembang dan mengalami kemajuan baik
                        dalam hal penyampaian informasi, maupun hal-hal lain yang menunjang
                        aktifitas pendidikan. Pembaharuan ini didasari oleh semakin pesatnya
                        teknologi informasi yang ada, dan sebagai institusi pendidikan yang melayani
                        masyarakat, kami berupaya agar dapat senantiasa bergerak mengikuti arus
                        perkembangan jaman demi mewujudkan pelayanan yang prima, inovatif, serta
                        informatif bagi segenap masyarakat yang membutuhkan.
                    </p>
                    <p className="text-smpgray text-sm font-medium font-poppins max-w-2xl leading-6">
                        Kami juga mengucapkan terima kasih untuk tim pengembang website yang telah
                        berupaya untuk dapat memperkenalkan profil SMP Negeri 20 Semarang kepada
                        masyarakat secara lebih luas melalui dunia maya. Kami sendiri menyadari
                        bahwa website ini masih jauh dari kata sempurna, sehingga setiap masukan
                        atau saran yang membangun tentu kami nantikan untuk kemajuan website ini.
                    </p>
                    <p className="text-smpgray text-sm font-medium font-poppins max-w-2xl leading-6">
                        Harapan kami, dengan adanya website ini dapat menjadi media komunikasi
                        antara pihak sekolah dengan masyarakat secara umum, sehingga terjalin
                        hubungan yang baik bagi kita semuanya. Akhirnya, kami mengucapkan terima
                        kasih, dan semoga kita semuanya senantiasa berada dalam naungan dan
                        lindungan Allah SWT.
                    </p>
                    <p className="text-smpgray text-sm font-medium font-poppins max-w-2xl">
                        Wassalamu'alaikum Warohmatullahi Wabarokatuh.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sambutan;
