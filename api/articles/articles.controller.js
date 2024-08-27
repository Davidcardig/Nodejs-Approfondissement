const articlesService = require("./articles.service.js");
const userModel = require("../users/users.model");

class ArticlesController {
    async create(req, res, next) {
        try {
            const userId = req.user.id;
            const article = await articlesService.create(req.body, userId);
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

            if (user.role !== "admin") {
                throw new UnauthorizedError(
                    "Vous n'avez pas les droits pour modifier cet article"
                );
            }
            const data = req.body;
            const articleModified = await articlesService.update(
                id,
                data,
                user._id.toString()
            );
            req.io.emit("article:update", { id });
            res.json(articleModified);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const user = req.user;

            if (user.role !== "admin") {
                throw new UnauthorizedError(
                    "Vous n'avez pas les droits pour supprimer cet article"
                );
            }

            await articlesService.delete(id, user._id.toString());
            req.io.emit("article:delete", { id });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new ArticlesController();