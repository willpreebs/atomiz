import express, { Router } from 'express';
import { UrlRoutes, RedirectRoutes } from './url/routes.js';
import 'dotenv/config';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const USERNAME = process.env.MONGO_USER;
const PASSWORD = process.env.MONGO_PASS;
const MONGO_DB = process.env.MONGO_DB;

const DB = `mongodb+srv://${USERNAME}:${PASSWORD}@atomizcluster.iojo68f.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
// const DB = `mongodb+srv://${USERNAME}:${PASSWORD}@atomizcluster.iojo68f.mongodb.net/?retryWrites=true&w=majority`;
console.log(DB);
mongoose.connect(DB);

const urlRouter = Router();
const redirectRouter = Router();

UrlRoutes(urlRouter);
RedirectRoutes(redirectRouter);

app.use("/url", urlRouter);
app.use("/", redirectRouter);

app.listen(4000);

