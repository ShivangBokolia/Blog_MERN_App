import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articleContent from "./Article-content.js";

// Components:
import Articles from "../components/Articles.jsx";
import Comments from "../components/Comments.jsx";
import AddCommentForm from "../components/AddCommentForm.jsx";
// Page:
import NotFound from "./NotFound.jsx";

const Article = () => {
    const { name } = useParams();
    const [articleInfo, setArticleInfo] = useState({ comments: [] });

    // runs everytime when the component is mounted
    useEffect(() => {
        // We cannot add async to the function for useEffect, therefore we create a separate one below.
        // The reason for adding the localhost:3000 below is because it was not able to detect the proxy.
        // Also, it won't run on Firefox, but will run on Chrome with the help of the following extension:
        // Allow CORS: Access-Control-Allow-origin in Chrome.
        const fetchData = async () => {
            const result = await fetch(
                `http://localhost:3000/api/articles/${name}`
            );
            const body = await result.json();
            setArticleInfo(body[0]);
        };
        fetchData();
    }, [name]);

    const article = articleContent.find((article) => article.name === name);
    if (!article) return <NotFound />;
    const otherArticles = articleContent.filter(
        (article) => article.name !== name
    );
    return (
        <>
            <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
                {article.title}
            </h1>
            {article.content.map((paragraph, index) => (
                <p
                    className="mx-auto leading-relaxed text-base mb-4"
                    key={index}
                >
                    {paragraph}
                </p>
            ))}
            <Comments comments={articleInfo.comments} />
            <AddCommentForm
                articleName={name}
                setArticleInfo={setArticleInfo}
            />
            <h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">
                Other Articles
            </h1>
            <div className="flex flex-wrap -m-4">
                <Articles articles={otherArticles} />
            </div>
        </>
    );
};

export default Article;
