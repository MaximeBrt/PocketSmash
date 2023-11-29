import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression'
import cors from 'cors';

const app = express();

app.use(cors({
    credentials:true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server1 = http.createServer(app)

server1.listen(3001, () => {
    console.log("Arena Server on port 3001")
})