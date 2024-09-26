import express from "express";
import cors from "cors";
// import globalErrorHandler from './middlewares/error-middleware'
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true }));
app.use(cors());

//routes import
import chatRouter from './routes/chat-router'

app.all('*',)
//routes declaration
app.use('/api/v1',chatRouter);

//global error handling middleware
// app.use(globalErrorHandler);
export default app