const VisiMisi = () => {
    return (
        <div className="py-10 flex flex-col items-center gap-10">
            <h1 className="font-poppins font-bold text-center text-4xl">
                Visi, Misi, dan Tujuan
                <br />
                <span className="text-smporange">SMP Negeri 20 Semarang</span>
            </h1>
            <img src="halaman.jpg" alt="" className="w-1/2 rounded-xl shadow-xl" />
            <div className="flex flex-col gap-5 max-w-4xl">
                <SubVisiMisi name={"A. Visi Sekolah"}>
                    <p className="font-poppins font-bold text-base mb-2">
                        “ MENJADI GENERASI YANG BERAKHLAK MULIA, BERKARAKTER DAN BERPRESTASI ”{" "}
                    </p>
                    <p>
                        Indikator:
                        <br />
                        1. Generasi yang menghayati dan mengamalkan ajaran agama .
                        <br />
                        2. Generasi yang jujur, disiplin, sportif, tanggung jawab, percaya diri,
                        hormat pada orang tua, dan guru.
                        <br />
                        3. Generasi yang berprestasi dibidang akademis dan non akademis.
                    </p>
                </SubVisiMisi>
                <SubVisiMisi name={"B. Misi Sekolah"}>
                    <p>
                        1. Menyusun KTSP sesuai prosedur tepat waktu;
                        <br />
                        2. Melaksanakan pembelajaran sesuai kompetensi lulusan;
                        <br />
                        3. Melaksanakan pembelajaran sesuai rencana;
                        <br />
                        4. Melaksanakan penilaian sebagai pengukur keberhasilan pembelajaran yang
                        obyektif dan akuntabel;
                        <br />
                        5. Meningkatkan kompetensi pendidik dan tenaga kependidikan;
                        <br />
                        6. Melengkapi sarana dan prasarana yang menunjang pembelajaran;
                        <br />
                        7. Mewujudkan lingkungan yang nyaman, aman dan ramah anak untuk menunjang
                        proses pembelajaran;
                        <br />
                        8. Mengelola keuangan secara transparan dan akuntabel.
                        <br />
                    </p>
                </SubVisiMisi>
                <SubVisiMisi name={"C. Tujuan Sekolah"}>
                    <p className="mb-2">
                        Tujuan pendidikan tingkat satuan pendidikan dasar mengacu pada tujuan umum
                        pendidikan dasar yaitu meletakkan dasar akhlak mulia, kepribadian,
                        kecerdasan, pengetahuan, serta keterampilan untuk hidup mandiri dan
                        mengikuti pendidikan lebih lanjut serta mewujudkan profil pelajar Pancasila.
                        Sedangkan secara khusus, sesuai dengan visi dan misi sekolah, tujuan SMP
                        Negeri 20 Semarang pada akhir tahun ajaran 2021/2022 yaitu :
                    </p>
                    <p>
                        1. Terwujudnya lulusan yang memiliki kompetensi abad 21 dan mampu bersaing
                        pada taraf nasional;
                        <br />
                        2. Tersusunnya KTSP yang sesuai prosedur dan tepat waktu;
                        <br />
                        3. Tersedianya perangkat pembelajaran yang disusun berdasarkan kompetensi;
                        <br />
                        4. Terlaksananya pembelajaran berdasarkan rencana;
                        <br />
                        5. Terlaksanya penilaian yang obyektif dan akuntabel;
                        <br />
                        6. Terwujudnya pendidik dan tenaga kependidikan yang kompeten;
                        <br />
                        7. Tersedianya sarana/pra-sarana guna menunjang pembelajaran;
                        <br />
                        8. Terwujudnya pengelolaan pendidikan yang direncanakan dengan profesional;
                        <br />
                        9. Terwujudnya pengelolaan keuangan yang transparan dan akuntabel.
                        <br />
                    </p>
                </SubVisiMisi>
            </div>
        </div>
    );
};

const SubVisiMisi = ({ children, name }) => {
    return (
        <div className="flex flex-col gap-5 shadow-xl pb-1 rounded-b-xl">
            <h2 className="font-poppins font-bold text-lg text-white bg-smporange px-5 py-3 rounded-xl shadow-xl">
                {name}
            </h2>
            <div className="px-5 pt-1 pb-5 font-poppins font-normal text-sm">{children}</div>
        </div>
    );
};

export default VisiMisi;
