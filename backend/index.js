import express from 'express';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoutes from "./routes/booksRoutes.js";
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Open CORS
app.use(cors());

//Custom CORS
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','PUT','POST','DELETE'],
//         allowedHeaders: ['Content-Type'],
//          })
// )

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to the Door of Knowledge Backend');
})

app.use('/books', booksRoutes);

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})
