const articlesService = require("./articles.service.js");
const userModel = require("../users/users.model");

class ArticlesController {

    async create(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await userModel.findById(userId);
            const article = await articlesService.create(req.body);
            req.io.emit("article:create", article);
            res.status(201).json(article);
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const user = req.user;
            const data = req.body;
            if (user.role === "admin") {
            const articleModified = await articlesService.update(id, data);
            res.json(articleModified);
            } else {
                return res.status(401).send("Vous n'avez pas les droits necessaires pour effectuer cette action")
            }
        } catch (err) {
            next(err);
        }

    }
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const user = req.user;
            if (user.role === "admin") {
                await articlesService.delete(id);
                req.io.emit("article:delete", {id});
                res.status(204).send();
            }else {
                return res.status(401).send("Vous n'avez pas les droits necessaires pour effectuer cette action")
            }
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new ArticlesController();