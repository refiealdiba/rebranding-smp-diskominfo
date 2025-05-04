import { useEffect, useState } from "react";
import { getArticleLatest } from "../../services/articles";
import { Link } from "react-router-dom";

const BeritaBaruList = () => {
    const [articleDataLatest, setArticleDataLatest] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getArticleLatest(8);
                setArticleDataLatest(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {articleDataLatest.map((article, index) => (
                <Link
                    key={index}
                    to={`/berita/${article.id}`}
                    className=" rounded-lg drop-shadow-lg hover:shadow-md overflow-hidden bg-white transition-all duration-300 ease-in-out"
                >
                    <div className="w-full h-40">
                        <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 font-poppins ">
                        <p className="font-medium text-xs text-smpgray">
                            {formatDate(article.created_at)}
                        </p>
                        <p className="font-bold text-base text-smpblack">
                            {article.title.length > 50
                                ? `${article.title.substring(0, 50)}...`
                                : article.title}
                        </p>
                    </div>
                    <p className="font-semibold text-xs text-smporange px-4 pt-2 pb-5">
                        Baca selengkapnya
                    </p>
                </Link>
            ))}
            {articleDataLatest.map((article, index) => (
                <Link
                    key={index}
                    to={`/berita/${article.id}`}
                    className=" rounded-lg drop-shadow-lg hover:shadow-md overflow-hidden bg-white transition-all duration-300 ease-in-out"
                >
                    <div className="w-full h-40">
                        <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 font-poppins ">
                        <p className="font-medium text-xs text-smpgray">
                            {formatDate(article.created_at)}
                        </p>
                        <p className="font-bold text-base text-smpblack">
                            {article.title.length > 50
                                ? `${article.title.substring(0, 50)}...`
                                : article.title}
                        </p>
                    </div>
                    <p className="font-semibold text-xs text-smporange px-4 pt-2 pb-5">
                        Baca selengkapnya
                    </p>
                </Link>
            ))}
            {articleDataLatest.map((article, index) => (
                <Link
                    key={index}
                    to={`/berita/${article.id}`}
                    className=" rounded-lg drop-shadow-lg hover:shadow-md overflow-hidden bg-white transition-all duration-300 ease-in-out"
                >
                    <div className="w-full h-40">
                        <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 font-poppins ">
                        <p className="font-medium text-xs text-smpgray">
                            {formatDate(article.created_at)}
                        </p>
                        <p className="font-bold text-base text-smpblack">
                            {article.title.length > 50
                                ? `${article.title.substring(0, 50)}...`
                                : article.title}
                        </p>
                    </div>
                    <p className="font-semibold text-xs text-smporange px-4 pt-2 pb-5">
                        Baca selengkapnya
                    </p>
                </Link>
            ))}
        </div>
    );
};

const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export default BeritaBaruList;
