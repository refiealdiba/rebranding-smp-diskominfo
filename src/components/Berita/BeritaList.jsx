import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../../services/articles";
import cleanText from "../../middleware/cleanText";

const BeritaList = () => {
    const [articleData, setArticleData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 3;

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getArticles();
                setArticleData(data);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, []);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articleData.slice(indexOfFirstArticle, indexOfLastArticle);

    const totalPages = Math.ceil(articleData.length / articlesPerPage);

    return (
        <div className="flex flex-col items-center font-inter px-4 py-8 gap-3 shadow-2xl rounded-xl">
            <div className="flex flex-col items-center gap-6 px-10 py-8">
                {/* Article Cards */}
                {currentArticles.map((article) => (
                    <div
                        key={article.id}
                        className="flex flex-col md:flex-row bg-white shadow-md rounded-lg border border-smporange w-full max-w-5xl overflow-hidden font-inter"
                    >
                        <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full md:w-60 h-60 min-w-[240px] object-cover object-center bg-gray-200"
                        />

                        <div className="p-5 flex flex-col justify-between gap-3">
                            <h2 className="text-lg md:text-lg font-semibold text-slate-800">
                                {article.title}
                            </h2>
                            <p className="text-sm md:text-base font-normal text-gray-700 line-clamp-4">
                                {cleanText(article.content)}
                            </p>
                            <Link
                                to={`/berita/${article.id}`}
                                className="text-smporange text-sm font-medium hover:underline mt-auto"
                            >
                                Lihat selengkapnya
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 text-smporange font-semibold text-lg self-start ml-10">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-2 py-1 rounded ${
                            currentPage === index + 1 ? " bg-smporange text-white" : "text-smpblack"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BeritaList;
