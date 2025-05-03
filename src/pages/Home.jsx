import BigBanner from "../components/BigBanner";
import WhySmp from "../components/WhySmp";
import Sambutan from "../components/Sambutan";
import MataPelajaran from "../components/MataPelajaran";

const Home = () => {
    return (
        <div className="text-black w-full flex flex-col gap-12">
            <BigBanner />
            <WhySmp />
            <Sambutan />
            <MataPelajaran />
        </div>
    );
};

export default Home;
