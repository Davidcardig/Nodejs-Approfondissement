const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");
const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/users.model");

describe("tester API articles", () => {
    let token;
    const USER_ID = "fake";
    const USER = {
        _id: USER_ID,
        name: "Admin",
        email: "admin@admin.com",
        password: "admin",
        role: "admin"
    };
    const ARTICLE_ID = "fake";


    const mockArticleCreated  = {
        title: "Article du Jour",
        content: "Bonjour !",
    };

    const mockArticleUpdate  = {
        _id: ARTICLE_ID,
        title: "Article du Jour",
        content: "Hello le monde !",
    };

    beforeEach(() => {
        token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
        mockingoose(Article).toReturn(mockArticleUpdate, 'findOneAndUpdate');
        mockingoose(Article).toReturn(mockArticleCreated, "save");
        mockingoose(User).toReturn(USER, "findOne");
    });



    it("création d'article", async () => {
        const res = await request(app)
            .post("/api/articles")
            .send(mockArticleCreated)
            .set("x-access-token", token);

        expect(res.status).toBe(201);
        expect(res.body.title).toBe(mockArticleCreated.title);
        expect(res.body.content).toBe(mockArticleCreated.content);
    })

    it("Mettre a jour un article", async () => {
        const res = await request(app)
            .put(`/api/articles/${ARTICLE_ID}`)
            .send(mockArticleUpdate)
            .set("x-access-token", token);

        expect(res.status).toBe(200);
        expect(res.body.title).toBe(mockArticleUpdate.title);
        expect(res.body.content).toBe(mockArticleUpdate.content);
    })

    it("Supression d'article", async () => {
        const res = await request(app)
            .delete(`/api/articles/${ARTICLE_ID}`)
            .set("x-access-token", token);
        expect(res.status).toBe(200);
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });
})