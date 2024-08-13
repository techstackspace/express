import express from 'express';
import { log } from './config/debugger';
import connectionToDB from './config/database';
import productRoutes from './routes';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

connectionToDB();

// Routes
app.use('/api', productRoutes);

app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});
