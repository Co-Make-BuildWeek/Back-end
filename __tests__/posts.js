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

    // it("POST /posts", async () => {
    //     const res = await supertest(server)
    //         .post('/posts')
    //         .send({title: "Fallen lamp post 2.0", 
    //         description: "A second lamp post has fallen and hit a car",
    //         user_id: 1, 
    //         imgSrc: "https://i.dailymail.co.uk/i/pix/2012/11/27/article-2239161-163B4E9E000005DC-124_634x399.jpg"})
    //     expect(res.statusCode).toBe(201)
    //     expect(res.type).toBe("application/json")
    //     expect(res.body.title).toBe("Fallen lamp post 2.0")
    //     expect(res.body.description).toBe("A second lamp post has fallen and hit a car")
    //     expect(res.body.user_id).toBe(1)
    // })
})