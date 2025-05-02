import { getArticles } from "../services/articles";

const Test = () => {
    getArticles()
        .then((data) => {
            console.log("Articles:", data);
        })
        .catch((error) => {
            console.error("Error fetching articles:", error);
        });

    return (
        <div>
            <h1 className="text-3xl font-bold text-center flex items-center justify-center min-h-screen">
                Test
            </h1>
        </div>
    );
};

export default Test;
