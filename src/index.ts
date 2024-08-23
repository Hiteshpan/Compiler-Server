import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";
const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173", process.env.CLIENT_URL!],
        methods: ['POST', 'GET'],
        credentials: true,
    })
);
config();

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

dbConnect();
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`)
})
