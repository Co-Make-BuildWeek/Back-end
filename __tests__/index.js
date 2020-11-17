const { expectCt } = require('helmet');
const supertest = require('supertest');
const server = require('../server')

test("GET /", async () => {
    const res = await supertest(server).get("/")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
})