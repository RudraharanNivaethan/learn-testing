import supertest from  'supertest';
import createServer from '../utils/server';
import { MongoMemoryServer } from 'mongodb-memory-server'; // In-memory MongoDB server for testing
import mongoose from 'mongoose';
import { createProduct } from '../service/product.service';
import { userInfo } from 'os';

const app = createServer(); // Always Create a fresh app instance for testing

const userId = new mongoose.Types.ObjectId().toString(); // Mock user ID for testing

export const productPayload = {
    user: userId,
    title: 'Iphone 15 Pro',
    description: 'Old model iphone',
    price: 1200,
    image: 'https://i.imgur.com/Q1RphfQ.jpg'
};

describe('product', () => { // Outer group: all product-related tests
    // Setup in-memory MongoDB server before all tests
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create(); // MongoDB Server starts instance of in-memory MongoDB
        await mongoose.connect(mongoServer.getUri()); // Connect mongoose to in-memory MongoDB by getting its connection URI
    })

    // After all tests, disconnect mongoose and stop in-memory MongoDB server
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    describe('get product route', () => {  // Group for tests related to GET /product
        describe('given the product does not exist', () => { // Context: when product is missing
            it('should return a 404', async () => { // Individual test case
                const productId = 'nonexistent-id';
                await supertest(app)
                    .get(`/api/products/${productId}`)
                    .expect(404);
            });
        });

        describe('given the product does exist', () => {
            it('should return a 200 and the product', async () => {
                // Let's create a product first to learn testing here by using a service
                const product = await createProduct(productPayload);
                const {body,statusCode} = await supertest(app)
                                                .get(`/api/products/${product.productId}`)
                                                .expect(200); // Way 1: expect from supertest
                
                expect(statusCode).toBe(200); // Way 2: Expect from jest
                expect(body.productId).toBe(product.productId);
            });
        });
    });
});