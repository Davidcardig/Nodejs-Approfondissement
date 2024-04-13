const Article = require('./articles.schema')


class ArticlesService {

    create(data) {
        const Articles = new Article(data);
        return Articles.save();
    }
    update(id, data) {
        return Article.findByIdAndUpdate(id, data, { new: true });
    }
    delete(id) {
        return Article.deleteOne({ _id: id });
    }

    async DisplayArticlesByUserId(userId) {
        return Article.find({ userId }).populate({
        path: "userId",
            select: "-password"
        });
    }
}

module.exports = new ArticlesService();
