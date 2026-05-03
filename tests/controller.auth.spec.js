import { app } from "../src/express/app.js"
import request from "supertest"


describe("test controllers/auth (success)", () =>
    {
        test("test Log in /auth", async () => 
            {
                const response = await request(app)
                    .post("/auth")
                    .send(
                        {
                            username: user1.username,
                            password: "test123123123"
                        }
                    )
                expect(response.statusCode).toBe(201)
                expect(response.body).toStrictEqual(
                    {
                        token:  expect.any(String)
                    }
                )
            }
        )
    }
)

describe("test controllers/auth (error)", () =>
    {
        test("(Invalid username or password) status code 403", async () =>
            {
                const response = await request(app)
                    .post("/auth")
                    .send(
                        {
                            username: "fakeusername",
                            password: "fakepassword"
                        }
                    )
                expect(response.statusCode).toBe(403)
                expect(response.body).toStrictEqual(
                    {
                        message: "Invalid username or password"
                    }
                )
            }
        )
    }
)