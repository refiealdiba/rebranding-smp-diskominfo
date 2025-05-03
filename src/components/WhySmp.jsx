import WhySmpCard from "./WhySmpCard";

const WhySmp = () => {
    return (
        <div className="flex flex-col items-center justify-center font-poppins gap-14">
            <div className="flex flex-col items-center gap-7">
                <h1 className="font-bold text-4xl w-xl text-center">
                    Kenapa Harus <span className="text-smporange">SMP Negeri 20 Semarang?</span>
                </h1>
                <p className="font-medium text-lg w-md text-center text-smpgray font-poppins">
                    Alasan kenapa haris memilih untuk bergabung dengan SMP Negeri 20 Semarang
                </p>
            </div>
            <div>
                <WhySmpCard />
            </div>
        </div>
    );
};

export default WhySmp;
