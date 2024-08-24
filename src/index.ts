import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";
config();

const app = express();
// const port = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.CLIENT_URL!, "http://localhost:5174"],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

// Explicitly handling preflight requests
app.options('*', cors({
    origin: [process.env.CLIENT_URL!],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('Access-Control-Allow-Origin:', res.getHeader('Access-Control-Allow-Origin'));
    });
    next();
});

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

dbConnect();
// app.listen(port, '0.0.0.0', () => {
//     console.log(`App listening on port ${port}`)
// })

const port: number = parseInt(process.env.PORT_URL || "3000", 10);

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})