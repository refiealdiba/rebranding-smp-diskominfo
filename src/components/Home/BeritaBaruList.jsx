import { useEffect, useState } from "react";
import { getArticleLatest } from "../../services/articles";
import formatDate from "../../middleware/formatDate";
import { Link } from "react-router-dom";

const BeritaBaruList = () => {
    const [articleDataLatest, setArticleDataLatest] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getArticleLatest(8);
                setArticleDataLatest(data);
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
                    className="flex flex-col h-full rounded-lg drop-shadow-lg hover:shadow-md overflow-hidden bg-white transition-all duration-300 ease-in-out"
                >
                    <div className="w-full h-40">
                        <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col flex-grow p-4 font-poppins">
                        <p className="font-medium text-xs text-smpgray">
                            {formatDate(article.created_at)}
                        </p>
                        <p className="font-bold text-base text-smpblack">
                            {article.title.length > 50
                                ? `${article.title.substring(0, 50)}...`
                                : article.title}
                        </p>
                        <div className="mt-auto pt-2">
                            <p className="font-semibold text-xs text-smporange">
                                Baca selengkapnya
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BeritaBaruList;
