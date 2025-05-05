import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../services/articles";
import cleanText from "../middleware/cleanText";

const BeritaDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getArticleById(id);
                setArticle(data);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, [id]);

    if (!article) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="px-4 md:px-10 py-10 font-poppins flex flex-col items-center gap-6">
            <h1 className="text-xl md:text-2xl font-bold text-center">
                Berita <span className="text-smporange">SMP Negeri 20 Semarang</span>
            </h1>

            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 max-w-4xl w-full text-center font-inter">
                <h2 className="text-md md:text-lg font-bold uppercase mb-4">{article.title}</h2>
                <div className="border border-gray-400 inline-block p-2 mb-6">
                    <img
                        src={article.thumbnail || "/default-image.jpg"}
                        alt={article.title}
                        className="w-full max-w-sm h-auto object-cover mx-auto"
                    />
                </div>
                <p className="text-justify text-sm md:text-base leading-relaxed font-light text-gray-700">
                    {cleanText(article.content)}
                </p>
            </div>
        </div>
    );
};

export default BeritaDetail;
