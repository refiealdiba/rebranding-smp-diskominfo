import MataPelajaranList from "./MataPelajaranList";

const MataPelajaran = () => {
    return (
        <div className="flex flex-col items-center mt-20 gap-17 px-3">
            <div className="font-poppins font-bold flex flex-col gap-7">
                <h1 className="max-w-md text-center text-4xl">
                    Mata Pelajaran di <span className="text-smporange">SMP Negeri 20 Semarang</span>
                </h1>
                <p className="font-medium text-lg text-center text-smpgray font-poppins">
                    Pilihan program keahlian di SMP Negeri 20 Semarang
                </p>
            </div>
            <div>
                <MataPelajaranList />
            </div>
        </div>
    );
};

export default MataPelajaran;
