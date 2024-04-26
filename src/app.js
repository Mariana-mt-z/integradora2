import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from "./routes/auth.routes.js"
import taksRoutes from "./routes/tasks.routes.js";


const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use((cookieParser()));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", authRoutes );
// app.use("/api", taksRoutes );



export default  app;
