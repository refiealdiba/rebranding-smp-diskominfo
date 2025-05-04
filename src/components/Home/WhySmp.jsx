import WhySmpCard from "./WhySmpCard";

const WhySmp = () => {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-smpsemiviolet font-poppins">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                    Kenapa Harus <span className="text-smporange">SMP Negeri 20 Semarang?</span>
                </h1>
                <p className="font-medium text-base sm:text-lg text-smpgray">
                    Alasan kenapa harus memilih untuk bergabung dengan SMP Negeri 20 Semarang
                </p>
            </div>
            <div className="mt-12">
                <WhySmpCard />
            </div>
        </section>
    );
};

export default WhySmp;
