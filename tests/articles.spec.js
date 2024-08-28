const mockingoose = require("mockingoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");

const { app } = require("../server");
const config = require("../config");
const Article = require("../api/articles/articles.schema");
const User = require("../api/users/users.model");

describe("API articles tests", () => {
    const USER_ID = "60d5f4ee2f8fb814c8b4b484";
    const ARTICLE_ID = "fake";
    let token;

    const USER_PAYLOAD = {
        user: { id: USER_ID, role: "admin" }
    };

    const MOCK_USER_DATA = {
        _id: ARTICLE_ID,
        name: "ana",
        email: "nfegeg@gmail.com",
        password: "azertyuiop",
        role: "admin"
    };

    const MOCK_ARTICLE_DATA = [{
        _id: ARTICLE_ID,
        title: "test",
        content: "test",
        state: "draft"
    }];

    const MOCK_ARTICLE_CREATED = {
        title: "test",
        content: "test",
        state: "draft"
    };

    const MOCK_ARTICLE_UPDATED = {
        title: "test",
        content: "test",
        user: ARTICLE_ID,
        state: "published"
    };

    beforeEach(() => {
        token = jwt.sign({ user: MOCK_USER_DATA }, config.secretJwtToken);
        mockingoose(User).toReturn(MOCK_USER_DATA, "findOne");
        mockingoose(Article).toReturn(MOCK_ARTICLE_DATA, "find");
        mockingoose(Article).toReturn(MOCK_ARTICLE_CREATED, "save");
        mockingoose(Article).toReturn(MOCK_ARTICLE_UPDATED, "findOneAndUpdate");
    });

    test("Create an Article", async () => {
        token = jwt.sign(USER_PAYLOAD, config.secretJwtToken);
        const response = await request(app)
            .post("/api/articles")
            .send(MOCK_ARTICLE_CREATED)
            .set("x-access-token", token);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(MOCK_ARTICLE_CREATED.title);
        expect(response.body.content).toBe(MOCK_ARTICLE_CREATED.content);
    });

    test("Update an Article", async () => {
        const response = await request(app)
            .put(`/api/articles/${ARTICLE_ID}`)
            .send(MOCK_ARTICLE_UPDATED)
            .set("x-access-token", token);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(MOCK_ARTICLE_UPDATED.title);
        expect(response.body.content).toBe(MOCK_ARTICLE_UPDATED.content);
    });

    test("Delete an Article", async () => {
        const response = await request(app)
            .delete(`/api/articles/${ARTICLE_ID}`)
            .set("x-access-token", token);

        expect(response.status).toBe(204);
        expect(response.body).toStrictEqual({});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});