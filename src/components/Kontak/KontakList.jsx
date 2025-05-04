import { Clock, Headset, MapPin } from "lucide-react";

const KontakList = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start font-poppins">
            {/* Jam Kerja */}
            <div className="flex flex-col items-center gap-6 bg-smpsemigray rounded-lg shadow-xl pb-5">
                <div className="flex items-center gap-2 bg-smporange text-white px-4 py-2 rounded-lg w-full justify-center">
                    <Clock />
                    <h2 className="font-semibold text-lg">Jam Kerja</h2>
                </div>
                <div className="text-center text-base font-normal">
                    <p>Senin - Kamis:</p>
                    <p>07.00 - 15.15 WIB</p>
                </div>
                <div className="text-center text-base font-normal">
                    <p>Jumat:</p>
                    <p>07.00 - 11.30 WIB</p>
                </div>
            </div>

            {/* Customer Service */}
            <div className="flex flex-col items-center gap-6 bg-smpsemigray rounded-lg shadow-xl pb-5">
                <div className="flex items-center gap-2 bg-smporange text-white px-4 py-2 rounded-lg w-full justify-center">
                    <Headset />
                    <h2 className="font-semibold text-lg">Customer Service</h2>
                </div>
                <div className="text-center text-base font-normal">
                    <p>Email:</p>
                    <p>smpn20semarangofficial@gmail.com</p>
                </div>
                <div className="text-center text-base font-normal">
                    <p>Telp:</p>
                    <p>(024) 6594074</p>
                </div>
            </div>

            {/* Alamat */}
            <div className="flex flex-col items-center gap-6 bg-smpsemigray rounded-lg shadow-xl pb-5">
                <div className="flex items-center gap-2 bg-smporange text-white px-4 py-2 rounded-lg w-full justify-center">
                    <MapPin />
                    <h2 className="font-semibold text-lg">Alamat</h2>
                </div>
                <div className="text-center text-base font-normal px-5">
                    <p>Jl. Gajah Raya, Sambirejo, Kec. Gayamsari</p>
                    <p>Kota Semarang, Jawa Tengah 50166</p>
                </div>
                <div className="w-full px-5">
                    <iframe
                        title="Lokasi SMPN 20 Semarang"
                        src="https://www.google.com/maps?q=-6.962396,110.468485&hl=id&z=16&output=embed"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-md"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default KontakList;
