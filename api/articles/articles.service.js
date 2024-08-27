const Article = require('./articles.schema')


class ArticlesService {


    async create(data, userId) {
        const article = new Article(data);
        article.user = userId;
        return await article.save();
    }

    async update(id, data) {
        return await Article.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Article.deleteOne({ _id: id });
    }

    async DisplayArticlesByUserId(userId) {
        return await Article.find().populate({path: 'user', match: { _id: userId }, select: "-password"});
    }

}

module.exports = new ArticlesService();
