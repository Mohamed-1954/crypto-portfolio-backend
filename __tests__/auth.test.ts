import request from "supertest";
import app from "../src/"; // Replace with the actual path to your Express app
import db from "../src/db"; // Mock this to avoid real DB calls
import bcrypt from "bcrypt";
import { signJwt } from "../src/services/auth/utils/jwt";
import { authSchema } from "../src/services/auth/validations";

jest.mock("../src/db");
jest.mock("bcrypt");
jest.mock("../src/services/auth/utils/jwt");

const mockDb = db as jest.Mocked<typeof db>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockSignJwt = signJwt as jest.Mock;

describe("Auth Endpoints", () => {
    describe("POST /auth/sign-up", () => {
        it("should create a new user successfully", async () => {
            const newUser = {
                email: "daoudi.houssam.03@gmail.com",
                password: "houssam123",
            };
            jest.spyOn(authSchema, "safeParse").mockReturnValue({
                success: true,
                data: newUser,
            } as any);
            // Mock user lookup (no duplicate)
            mockDb.query.users.findFirst.mockResolvedValue(null);

            // Mock bcrypt hash
            mockBcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");

            mockDb.insert.mockResolvedValue([{ id: "user-id-123" }] as never);

            const response = await request(app).post("/auth/sign-up").send(newUser);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Registration request submitted");
            expect(mockDb.insert).toHaveBeenCalledWith(
                expect.objectContaining({
                    values: expect.objectContaining({ email: newUser.email }),
                })
            );
        });

        it("should return 400 for duplicate email", async () => {
            const duplicateUser = { email: "test@example.com", password: "password123" };

            // Mock duplicate user
            mockDb.query.users.findFirst.mockResolvedValue({ id: "existing-user-id" });

            const response = await request(app).post("/auth/sign-up").send(duplicateUser);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(
                "Email already exists, please use a different email or login."
            );
        });
    });

    describe("POST /auth/sign-in", () => {
        it("should log in a user successfully", async () => {
            const loginUser = {
                email: "test@example.com",
                password: "password123",
            };

            // Mock existing user
            const hashedPassword = "hashedPassword";
            mockDb.query.users.findFirst.mockResolvedValue({
                id: "user-id-123",
                email: loginUser.email,
                password: hashedPassword,
                refreshToken: [],
            });

            // Mock bcrypt compare
            mockBcrypt.compare.mockResolvedValue(true as never);

            // Mock JWT signing
            mockSignJwt
                .mockResolvedValueOnce("accessToken")
                .mockResolvedValueOnce("refreshToken");

            // Mock DB update for refresh tokens
            mockDb.update.mockResolvedValue(undefined as never);

            const response = await request(app).post("/auth/sign-in").send(loginUser);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Login Successful");
            expect(response.body).toHaveProperty("accessToken");
            expect(mockSignJwt).toHaveBeenCalledTimes(2);
        });

        it("should return 401 for invalid email or password", async () => {
            const invalidUser = {
                email: "invalid@example.com",
                password: "wrongPassword",
            };

            // Mock no user found
            mockDb.query.users.findFirst.mockResolvedValue(null);

            const response = await request(app).post("/auth/sign-in").send(invalidUser);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid email or password");
        });
    });
});
