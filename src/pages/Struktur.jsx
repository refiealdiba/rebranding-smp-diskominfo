const Struktur = () => {
    return (
        <div className="flex flex-col items-center py-10 gap-7">
            <h1 className="font-poppinsfont-bold text-4xl max-w-md text-center">
                Struktur Organisasi <span className="text-smporange">SMP Negeri 20 Semarang</span>
            </h1>
            <div className="grid grid-cols-1 grid-rows-2 bg-white drop-shadow-2xl max-w-5xl px-5 py-7">
                <img src="struktur1.jpeg" alt="" className="w-full" />
                <img src="struktur2.jpeg" alt="" className="w-full" />
            </div>
        </div>
    );
};

export default Struktur;
