const mockingoose = require("mockingoose");
const articlesService = require("../api/articles/articles.service.js");
const Article = require("../api/articles/articles.schema");

describe("tester API articles", () => {

    const USER_ID = 1;
   const mockArticle = {
        _id: USER_ID,
        title: "Article du Jour",
        content: "Bonjour !",
    };
    const mockArticleCreated  = {
        title: "Article du Jour",
        content: "Bonjour !",
    };



    it("création d'article", async () => {

        mockingoose(Article).toReturn(mockArticle, 'save');

        const createdArticle = await articlesService.create(mockArticleCreated);

        expect(createdArticle._id).toBeDefined();
    })

    it("Mettre a jour un article", async () => {

        mockingoose(Article).toReturn(mockArticle, 'findOneAndUpdate');

        const updatedArticle = await articlesService.update(mockArticle._id, mockArticle);

        expect(updatedArticle.title).toBe("Article du Jour");
        expect(updatedArticle.content).toBe("Bonjour !");
    })

    it("Supression d'article", async () => {

        mockingoose(Article).toReturn({ deletedCount: USER_ID }, 'deleteOne');

        const result = await articlesService.delete(USER_ID);

        expect(result.deletedCount).toBe(USER_ID);
    })
})