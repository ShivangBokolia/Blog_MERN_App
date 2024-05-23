import { useState } from "react";
import React from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
    const [username, setUsername] = useState("");
    const [commentText, setCommentText] = useState("");

    const addComments = async () => {
        const result = await fetch(
            `http://localhost:3000/api/articles/${articleName}/add-comments`,
            {
                method: "POST",
                body: JSON.stringify({ username, text: commentText }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const body = await result.json();
        setArticleInfo(body[0]);
        setUsername("");
        setCommentText("");
    };

    return (
        <form className="shadow rounded px-8 pb-8 pt-6 mb-4">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
                Add a comment
            </h3>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:{" "}
            </label>
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Comment:
            </label>
            <textarea
                rows="4"
                cols="50"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => addComments()}
            >
                Add Comment
            </button>
        </form>
    );
};

export default AddCommentForm;
