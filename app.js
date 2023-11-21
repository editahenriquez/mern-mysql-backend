import express from 'express';
import cors from 'cors';
import tasksRouters from './routes/tasks.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(tasksRouters);
app.use((req,res,next)=>{res.status(404).json({messge: 'Not found'})});

export default app;