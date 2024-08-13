import express from 'express';
import { log } from './config/debugger';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});
