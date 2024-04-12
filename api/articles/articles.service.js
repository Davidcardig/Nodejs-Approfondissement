const Articles = require('./articles.schema')
const path = require("path");


class ArticlesService {

    create(data) {
        const Articles = new Article(data);
        return Articles.save();
    }
    update(id, data) {
        return Articles.findByIdAndUpdate(id, data, { new: true });
    }
    delete(id) {
        return Articles.deleteOne({ _id: id });
    }

    async DisplayArticlesByUserId(userId) {
        return Articles.find({ userId }).populate({
        path: "userId",
            select: "-password"
        });
    }
}

module.exports = new ArticlesService();
