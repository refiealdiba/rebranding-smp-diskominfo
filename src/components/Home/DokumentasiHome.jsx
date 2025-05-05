import DokumentasiHomeList from "./DokumentasiHomeList";

const DokumentasiHome = () => {
    return (
        <div className="flex flex-col items-center mt-20 gap-10 px-3 bg-smpsemiviolet py-10">
            <div className="font-poppins font-bold flex flex-col gap-3">
                <h1 className="max-w-xl text-center text-4xl text-black leading-snug">
                    Foto Dokumentasi Kegiatan
                    <br />
                    <span className="text-smporange">SMP Negeri 20 Semarang</span>
                </h1>
            </div>
            <DokumentasiHomeList />
        </div>
    );
};

export default DokumentasiHome;
