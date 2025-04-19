const request = require("supertest");
const app = require("../src/server");
const { connectDB, closeDB } = require("../src/config/db");
const User = require("../src/models/user");
const Profile = require("../src/models/profile");
const formdata = require("../src/models/form-data");

jest.mock("../src/middleware/auth", () => (req, res, next) => {
    req.user = { id: "123" }; // Mock authenticated user
    next();
});

jest.mock("../src/models/user");
jest.mock("../src/models/profile");
jest.mock("../src/models/form-data");

beforeAll(async () => {
    await connectDB(); // Connect to the database before tests
});

afterAll(async () => {
    await closeDB(); // Close the database after tests
});

describe("GET /profile", () => {
    it("should return the user's profile data", async () => {
        // Mock user data
        const mockUser = { id: "123", name: "John Doe", rollno: "12345" };
        User.findById.mockResolvedValue(mockUser);

        // Mock submission history
        const mockSubmissions = [{ id: "1", title: "Form 1" }];
        formdata.find.mockResolvedValue(mockSubmissions);

        // Mock profile update
        const mockProfile = { ...mockUser, submissionHistory: mockSubmissions };
        Profile.findOneAndUpdate.mockResolvedValue(mockProfile);

        // Send request
        const res = await request(app)
            .get("/profile")
            .set("Authorization", "Bearer valid_token"); // Mock token

        // Assertions
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockProfile);
    });
});