import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

// ─── STEP 1: CORS — MUST BE ABSOLUTE FIRST ───────────────────────────────────
// Echo the requesting origin back so any Vercel/Netlify/localhost domain works.
// This runs before EVERYTHING — DB connection, body parsing, routes.
// If this doesn't run first, CORS errors appear even when the server crashes.
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');

  // Preflight — respond immediately, no further processing needed
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

// ─── STEP 2: Body Parsing ─────────────────────────────────────────────────────
app.use(express.json());

// ─── STEP 3: Lazy DB Connection ───────────────────────────────────────────────
// Connect per-request instead of at startup.
// On Vercel serverless, startup crashes kill CORS headers.
// Lazy connection means CORS always runs first, DB errors return proper JSON.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection failed:', err.message);
    return res.status(503).json({ message: 'Database unavailable. Check MONGODB_URI env var.' });
  }
});

// ─── STEP 4: Routes ───────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Blog Platform API is running 🚀' });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Only start listening when running locally (not on Vercel serverless)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

export default app;
