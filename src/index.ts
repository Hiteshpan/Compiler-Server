import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";

// Load environment variables
config();

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.CLIENT_URL], // Use the CLIENT_URL from environment
        methods: ['POST', 'GET'],
        credentials: true,
    })
);

// Route handlers
app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

// Connect to the database
dbConnect();

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`);
});
