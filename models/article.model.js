const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        comments: {
            type: Array,
            default: [],
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
