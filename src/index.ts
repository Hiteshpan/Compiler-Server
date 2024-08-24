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
    origin: [process.env.CLIENT_URL || 'http://localhost:5173'],  // Use environment variable for origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Explicitly handling preflight requests
app.options('*', cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:5173'],  // Use environment variable for origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin as string);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);  // No Content
});



app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('Access-Control-Allow-Origin:', res.getHeader('Access-Control-Allow-Origin'));
    });
    next();
});

config();

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

dbConnect();
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`)
})