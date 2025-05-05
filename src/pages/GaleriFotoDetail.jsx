const GaleriFotoDetail = () => {
    return (
        <div className="flex flex-col items-center gap-10 py-10">
            <h1 className="font-poppins font-bold text-4xl max-w-md text-center">
                Galeri Foto <span className="text-smporange">SMP Negeri 20 Semarang</span>
            </h1>
            <div className="flex flex-col items-center bg-white drop-shadow-2xl max-w-5xl px-5 py-7 gap-7 font-inter font-semibold text-lg">
                <h2>{dataFoto.title}</h2>
                <div className="grid grid-cols-2 gap-10 px-5 py-7">
                    {dataFoto.images.map((img, index) => (
                        <div key={index} className="w-full">
                            <img src={img} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const dataFoto = {
    title: "Placeholder title",
    images: ["sarpras4.jpg", "sarpras7.jpg", "sarpras9.jpg", "sarpras10.jpg"],
};

export default GaleriFotoDetail;
