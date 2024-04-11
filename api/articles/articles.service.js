const Articles = require('articles.schema')


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

}

module.exports = new ArticlesService();
