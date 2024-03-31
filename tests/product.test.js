const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../app')
const helper = require('../helpers/product.helper')

require('dotenv').config

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => { console.log("Connection to MongoDB established.")},
        err => { console.log("Failed to connect to MongoDB", err)}
    )
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe("Request GET /api/products", () => {
    it("Returns all products", async() => {
        const res = await request(app).get('/api/products')
        expect(res.statusCode).toBe(200)
        expect(res.body.data.length).toBeGreaterThan(0)
    }, 10000)
})

describe('Request GET /api/products/:product', () => {
    it('Returns a product', async() => {
        const product = await helper.findLastInsertedProduct()
        const res = await request(app).get('/api/products/' + product.product)
        expect(res.statusCode).toBe(200)
        expect(res.body.data.product).toBe(product.product)
    }, 10000)
})

describe('Request POST /api/products', () => {
    it('Creates a product', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "testProduct1",
            cost: 10,
            description: "Product for test",
            quantity: 1
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing product field', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: null,
            cost: 10,
            description: "Product for test",
            quantity: 1
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing cost field', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "testProduct1",
            cost: null,
            description: "Product for test",
            quantity: 1
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing cost field type', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "testProduct2",
            cost: "test",
            description: "Product for test",
            quantity: 1
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing description field', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "testProduct3",
            cost: 10,
            description: null,
            quantity: 1
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing quantity field', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "testProduct4",
            cost: 10,
            description: "Product for test",
            quantity: null
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing quantity field type', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "testProduct5",
            cost: 10,
            description: "Product for test",
            quantity: "test"
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)
})

describe('Request DELETE /api/products/:product', () => {
    it('Deletes last inserted product', async () => {
        const product = await helper.findLastInsertedProduct()
        const res = await request(app).delete('/api/products/' + product.product)
        expect(res.statusCode).toBe(200)
    },10000)
})