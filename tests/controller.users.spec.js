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
                const response = await request(app)
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

describe("test controllers/users POST (error)", () => 
    {
        test("(no username) status code 400", async () =>
            {
                const response = await request(app)
                    .post("/users").send(
                        {
                            email: "lobolobo@gmail.com",
                            password: "lobuzinho123"
                        }
                    )
                expect(response.statusCode).toBe(400)
                expect(response.body).toStrictEqual(
                    {
                        errors: [
                            {
                                location: "body",
                                msg: "Requires username",
                                path: "username",
                                type: "field"
                            },
                            {
                                location: "body",
                                msg: "The username must be at least 5 characters long",
                                path: "username",
                                type: "field",
                                value: ""
                            }
                        ]
                    }
                )
            }
        )

        test("(username is already in use) status code 409", async () =>
            {
                const response = await request(app)
                    .post("/users")
                    .send(
                        {
                            username: user.username,
                            email: "newemail@example.com",
                            password: "123123123test"
                        }
                    )
                expect(response.statusCode).toBe(409)
                expect(response.body).toStrictEqual(
                    {
                        message: "This username is already in use"
                    }
                )
            }
        )

        test("(no email) status code 400", async () => {
                const response = await request(app)
                    .post("/users")
                    .send(
                        {
                            username: "newusername123test",
                            password: "password123321"
                        }
                    )
                expect(response.statusCode).toBe(400)
                expect(response.body).toStrictEqual(
                    {
                        errors: [
                            {
                                location: "body",
                                msg: "Requires email",
                                path: "email",
                                type: "field"
                            },
                            {
                                location: "body",
                                msg: "This is not a valid email",
                                path: "email",
                                type: "field",
                                value: "",

                            }
                        ]
                    }
                )
            }
        )

        test("(email is already in use) status code 409", async () =>
            {
                const response = await request(app)
                    .post("/users")
                    .send(
                        {
                            username: "newusername",
                            email: user.email,
                            password: "newpassword123"
                        }
                    )
                expect(response.statusCode).toBe(409)
                expect(response.body).toStrictEqual(
                    {
                        message: "This email is already in use"
                    }
                )
            }
        )

        test("(no password) status code 400", async () => 
            {
                const response = await request(app)
                    .post("/users")
                    .send(
                        {
                            username: "usernametest123",
                            email: "email@email.com"
                        }
                    )
                expect(response.statusCode).toBe(400)
                expect(response.body).toStrictEqual(
                    {
                        errors: [
                            {
                                location: "body",
                                msg: "Requires password",
                                path: "password",
                                type: "field"
                            },
                            {
                                location: "body",
                                msg: "The password must be at least 8 characters long",
                                path: "password",
                                type: "field",
                                value: "",
                            }
                        ]
                    }
                )
            }
        )
    }
)

describe("test controllers/users GET (error)", () => 
    {
        test("(invalid ID) status code 400", async () => 
            {
                const response = await request(app)
                    .get("/users/g3j4f2v1bg27sd4")
                expect(response.statusCode).toBe(400)
                expect(response.body).toStrictEqual(
                    {
                        errors: [
                            {
                                location: "params",
                                msg: "This ID is invalid",
                                path: "user_id",
                                type: "field",
                                value: "g3j4f2v1bg27sd4"
                            }
                        ]
                    }
                )
            }
        )

        test("(unauthorized please log in) status code 401", async () =>
            {
                const response = await request(app)
                    .get(`/users/${user._id}`)
                expect(response.statusCode).toBe(401)
                expect(response.body).toStrictEqual(
                    {
                        message: "Please log in"
                    }
                )
            }
        )

        test("(invalid token) status code 401", async () =>
            {
                const response = await request(app)
                    .get(`/users/${user._id}`)
                    .set("authorization", "invalid token")
                    .set("Content-Type", "application/json")
                expect(response.statusCode).toBe(401)
                expect(response.body).toStrictEqual(
                    {
                        message: "unauthorized"
                    }
                )
            }
        )

        test("(not found) status code 404", async () => 
            {
                const fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjlmNjZkN2EwYWNhMzI1YzAyMzBkMDdiIiwidXNlcm5hbWUiOiJtYXljb25sb2JvIiwiZW1haWwiOiJtYXljb25AZ21haWwuY29tIn0._3GV1cJQXyYub0DIdNcbYP3Z2rntwKqA2X0R5ArmYbk"
                const response = await request(app)
                    .get("/users/69f66d7a0aca325c0230d07b")
                    .set("authorization", fake_token)
                    .set("Content-Type", "application/json")
                expect(response.body).toStrictEqual(
                    {
                        message: "This user does not exist"
                    }
                )
                expect(response.statusCode).toBe(404)
            }
        )
    }
)

describe("test controllers/users DELETE (error)", () => 
    {
        test("(invalid ID) status code 400", async () => 
            {
                const response = await request(app)
                    .delete("/users/d3dsadsads1bg27sd4")
                expect(response.statusCode).toBe(400)
                expect(response.body).toStrictEqual(
                    {
                        errors: [
                            {
                                location: "params",
                                msg: "This ID is invalid",
                                path: "user_id",
                                type: "field",
                                value: "d3dsadsads1bg27sd4"
                            }
                        ]
                    }
                )
            }
        )

        test("(not found) status code 404", async () => 
            {
                const fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjlmNjZkN2EwYWNhMzI1YzAyMzBkMDdiIiwidXNlcm5hbWUiOiJtYXljb25sb2JvIiwiZW1haWwiOiJtYXljb25AZ21haWwuY29tIn0._3GV1cJQXyYub0DIdNcbYP3Z2rntwKqA2X0R5ArmYbk"
                const response = await request(app)
                    .delete("/users/69f66d7a0aca325c0230d07b")
                    .set("authorization", fake_token)
                    .set("Content-Type", "application/json")
                expect(response.statusCode).toBe(404)
                expect(response.body).toStrictEqual(
                    {
                        message: "This user does not exist"
                    }
                )
            }
        )

        test("(unauthorized please log in) status code 401", async () =>
            {
                const response = await request(app)
                    .delete(`/users/${user._id}`)
                expect(response.statusCode).toBe(401)
                expect(response.body).toStrictEqual(
                    {
                        message: "Please log in"
                    }
                )
            }
        )

        test("(invalid token) status code 401", async () =>
            {
                const response = await request(app)
                    .delete(`/users/${user._id}`)
                    .set("authorization", "invalid token")
                    .set("Content-Type", "application/json")
                expect(response.statusCode).toBe(401)
                expect(response.body).toStrictEqual(
                    {
                        message: "unauthorized"
                    }
                )
            }
        )
    }
)


