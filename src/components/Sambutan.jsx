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
                    alt=""
                    className="object-cover object-top w-35 rounded-xl"
                />
                <div className="flex flex-col gap-5">
                    <h3 className="text-lg font-poppins font-bold max-w-xs">
                        Sambutan Kepala Sekolah SMP Negeri 20 Semarang
                    </h3>
                    <p className="text-smpgray text-sm font-medium font-poppins max-w-lg">
                        Assalamu'alaikum Warohmatullahi Wabarokatuh. Segala puji dan rasa syukur
                        kehadirat Allah SWT, Tuhan Yang Maha Esa oleh karena rahmat dan hidayahNya
                        sehingga website SMP Negeri 20 Semarang ini dapat kami perbaharui untuk
                        semakin berkembang dan mengalami kemajuan baik dalam hal penyampaian
                        informasi, pembelajaran, serta penelitian dan pengabdian kepada masyarakat.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sambutan;
