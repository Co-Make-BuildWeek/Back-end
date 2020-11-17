const supertest = require('supertest');
const server = require('../server');
const db = require("../data/db-config");
const usersModel = require("../users/users-model");

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("Users integration tests", () => {
    it("GET /users", async () => {
        const res = await supertest(server).get("/users")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body[0].name).toBe("Sean")
    })

    it("GET /users/id", async () => {
        const res = await supertest(server).get("/users/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("Chase")
    })

    it("POST /users", async () => {
        const res = await supertest(server)
            .post("/users")
            .send({name: "Test", email: "test@test.com", username: "Test1", password: "Test1"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("Test")
        expect(res.body.email).toBe("test@test.com")
        expect(res.body.username).toBe("Test1")
        expect(res.body.password).toBe("Test1")
    })
})