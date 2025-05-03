import BigBanner from "../components/Home/BigBanner";
import WhySmp from "../components/Home/WhySmp";
import Sambutan from "../components/Home/Sambutan";
import MataPelajaran from "../components/Home/MataPelajaran";
import Ekstrakulikuler from "../components/Home/Ekstrakulikuler";
import BeritaBaru from "../components/Home/BeritaBaru";
import DokumentasiHome from "../components/Home/DokumentasiHome";

const Home = () => {
    return (
        <div className="text-black w-full flex flex-col gap-12">
            <BigBanner />
            <WhySmp />
            <Sambutan />
            <MataPelajaran />
            <Ekstrakulikuler />
            <BeritaBaru />
            <DokumentasiHome />
        </div>
    );
};

export default Home;
