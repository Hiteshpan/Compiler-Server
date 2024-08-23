import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";

const app = express();
config();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL!,
}));
// console.log("is your client url:", process.env.CLIENT_URL)

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

dbConnect();

app.listen(4000, () => {
    console.log("http://localhost:4000");
})