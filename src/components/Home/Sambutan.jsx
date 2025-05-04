const Sambutan = () => {
    return (
        <div className="flex flex-col items-center mt-20 gap-12 px-4">
            <div className="font-poppins font-bold text-3xl sm:text-4xl text-center">
                <h1 className="max-w-md">
                    Profil <span className="text-smporange">SMP Negeri 20 Semarang</span>
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
                <img
                    src="bapakagus.png"
                    alt="Bapak Agus"
                    className="w-40 h-52 sm:w-52 sm:h-64 object-cover object-top rounded-xl"
                />
                <div className="flex flex-col gap-5 max-w-2xl text-sm text-smpgray font-poppins font-medium leading-6 text-justify">
                    <p>Assalamu'alaikum Warohmatullahi Wabarokatuh.</p>
                    <p>
                        Segala puji dan rasa syukur kehadirat Allah SWT, Tuhan Yang Maha Esa oleh
                        karena rahmat dan hidayahNya sehingga website SMP Negeri 20 Semarang ini
                        dapat kami perbaharui untuk semakin berkembang dan mengalami kemajuan baik
                        dalam hal penyampaian informasi, maupun hal-hal lain yang menunjang
                        aktifitas pendidikan. Pembaharuan ini didasari oleh semakin pesatnya
                        teknologi informasi yang ada, dan sebagai institusi pendidikan yang melayani
                        masyarakat, kami berupaya agar dapat senantiasa bergerak mengikuti arus
                        perkembangan jaman demi mewujudkan pelayanan yang prima, inovatif, serta
                        informatif bagi segenap masyarakat yang membutuhkan.
                    </p>
                    <p>
                        Kami juga mengucapkan terima kasih untuk tim pengembang website yang telah
                        berupaya untuk dapat memperkenalkan profil SMP Negeri 20 Semarang kepada
                        masyarakat secara lebih luas melalui dunia maya. Kami sendiri menyadari
                        bahwa website ini masih jauh dari kata sempurna, sehingga setiap masukan
                        atau saran yang membangun tentu kami nantikan untuk kemajuan website ini.
                    </p>
                    <p>
                        Harapan kami, dengan adanya website ini dapat menjadi media komunikasi
                        antara pihak sekolah dengan masyarakat secara umum, sehingga terjalin
                        hubungan yang baik bagi kita semuanya. Akhirnya, kami mengucapkan terima
                        kasih, dan semoga kita semuanya senantiasa berada dalam naungan dan
                        lindungan Allah SWT.
                    </p>
                    <p className="text-start">Wassalamu'alaikum Warohmatullahi Wabarokatuh.</p>
                </div>
            </div>
        </div>
    );
};

export default Sambutan;
