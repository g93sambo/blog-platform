import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// --- Health Check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Blog Platform API is running 🚀' });
});

// --- 404 Handler ---
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --- Global Error Handler ---
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
