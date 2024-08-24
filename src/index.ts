import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";

config();

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [process.env.CLIENT_URL! || 'http://localhost:5173'],  // Use environment variable for origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Explicitly handling preflight requests
app.options('*', cors({
    origin: [process.env.CLIENT_URL! || 'http://localhost:5173'],  // Use environment variable for origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://compiler-client.vercel.app"); // Allow your local dev server
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('Access-Control-Allow-Origin:', res.getHeader('Access-Control-Allow-Origin'));
    });
    next();
});

app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
});

config();

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

dbConnect();
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`)
    console.log('JWT_KEY:', process.env.JWT_KEY);
})