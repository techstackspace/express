import express, { json } from 'express';
import { log } from './config/debugger';
import connectionToDB from './config/database';
import productRoutes from './routes/product';
import userRoutes from './routes/user';
import commentRoutes from './routes/comment';
import reviewRoutes from './routes/review';
import subscribeRoutes from './routes/subscribe';
import feedbackRoutes from './routes/feedback';
import cartRoutes from './routes/cart';
import bookmarkRoutes from './routes/bookmark';
import orderRoutes from './routes/order';
import addressRoutes from './routes/address'

const app = express();
const port = process.env.PORT || 5000;

app.use(json());

connectionToDB();

app.use(express.static('public'));
app.use(express.static('public/assets/favicon'));
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', commentRoutes);
app.use('/api', reviewRoutes);
app.use('/api', subscribeRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', cartRoutes);
app.use('/api', bookmarkRoutes);
app.use('/api', orderRoutes);
app.use('/api', addressRoutes);

app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});
