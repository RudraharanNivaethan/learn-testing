// Step 3: Import necessary modules
import * as UserService from '../service/user.service'; // Service functions for user-related operations
import mongoose from 'mongoose';
import supertest from  'supertest';
import createServer from '../utils/server';

const app = createServer(); // Always Create a fresh app instance for testing

// Step 2: Create user input
const userInput = {
    email: "test@example.com",
    name: "John Doe",
    password: "Password123#",
    passwordConfirmation: "Password123#",
};

const userId = new mongoose.Types.ObjectId().toString(); // Mock user ID for testing

const userPayLoad = {
    _id: userId,
    email: "test@example.com",
    name: "John Doe",
};

// Step 1: Write basic test structure
describe('user', () => {
    // user registration
    describe('user registration', () => {
        describe('given that the username and password are valid', () => {
            it('should return the user payload', async() => {
                // spyOn takes two arguments: the module / object, property inside that module / object
                const createUserServiceMock = jest
                      .spyOn(UserService, 'createUser')
                      // @ts-ignore
                      .mockReturnValueOnce(userPayLoad);

                const {statusCode, body} = await supertest(app)
                                 .post('/api/users')
                                 .send(userInput)
                
                expect(statusCode).toBe(200);
                expect(body).toEqual(userPayLoad); // don't use toBe
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
            });
        });

        describe('given that the passwords do not match', () => {
            it('should return a 400', async() => {});
        });

        describe('given the user service throws', () => {
            // as per user.controller.ts, it returns 409 on error
            it('should return 409', async() => {});
        });
    });


       // username and password get validated
       // verify that passwords match
       // verify that the handler handles any errors

    // creating a user session
       // user can login with valid email and password
    
    describe('create user session', () => {
        describe('given that the username and passwords are valid', () => {
            it('should return a signed access token and refresh token', async() => {});
        });
    });
})