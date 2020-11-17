const supertest = require('supertest');
const server = require("../server");
const db = require("../data/db-config");
const postModel = require("../posts/post-model");

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("Posts integration tests", () => {
    it("GET /posts", async () => {
        const res = await supertest(server).get("/posts")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body[0].title).toBe("Pothole in the neighborhood")
    })

    it("GET /posts/id", async () => {
        const res = await supertest(server).get("/posts/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.title).toBe("Fallen lamp post")
    })
})