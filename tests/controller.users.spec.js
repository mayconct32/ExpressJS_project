import { app } from "../src/express/app.js"
import request from "supertest"


describe("test controllers/users (success)", () =>
    {
        test("Insert User status code 201", async () =>
            {
                const response = await request(app).post("/users")
                    .send(
                        {
                            username: "usertest",
                            email: "usertest@gmail.com",
                            password: "testtest123"
                        }
                    )
                expect(response.statusCode).toBe(201)
            }
        )

        test("Get User status code 200", async () =>
            {   
                const response = await await request(app)
                    .get(`/users/${user._id}`)
                    .set("authorization", token)
                    .set("Content-Type", "application/json")
                expect(response.statusCode).toBe(200)
            }
        )

        test("Delete User status code 200", async () => 
            {
                const response = await request(app)
                    .delete(`/users/${user._id}`)
                    .set("authorization", token)
                    .set("Content-Type", "application/json")
                expect(response.statusCode).toBe(200)
            }
        )

        test("Update User status code 200", async () => 
            {
                const response = await request(app)
                    .put(`/users/${user._id}`)
                    .set("authorization", token)
                    .set("Content-Type", "application/json")
                    .send(
                        {
                            username: "newusername",
                            email: user.email,
                            password: user.password
                        }
                    )
                expect(response.statusCode).toBe(200)
            }
        )
    }
)

