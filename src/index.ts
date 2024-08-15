import express, { json } from 'express';
import { log } from './config/debugger';
import connectionToDB from './config/database';
import productRoutes from './routes/product';
import userRoutes from './routes/user';
import commentRoutes from './routes/comment';

const app = express();
const port = process.env.PORT || 5000;

app.use(json());

connectionToDB();

app.use(express.static('public'));
app.use(express.static('public/assets/favicon'));
app.use('/api', productRoutes);git branch
app.use('/api', userRoutes);
app.use('/api', commentRoutes);

app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});
