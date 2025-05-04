import { useEffect, useState } from "react";
import { getArticles } from "../../services/articles";

const BeritaBaruList = () => {
    const [articleData, setArticleData] = useState([]);

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
    return (
        <div>
            {articleData.length}
            {articleData.map((article) => (
                <p>{article.title}</p>
            ))}
        </div>
    );
};

export default BeritaBaruList;
