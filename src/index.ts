import express, { json } from 'express';
import { log } from './config/debugger';
import connectionToDB from './config/database';
import productRoutes from './routes/product';
import userRoutes from './routes/user';
import commentRoutes from './routes/comment';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(json());
// app.use(static())

connectionToDB();

// Routes
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', commentRoutes);
app.use(express.static('public'));

app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});
