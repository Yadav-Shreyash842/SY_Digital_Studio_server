import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();

const app = express();

const sanitizeString = (value) => value
  .replace(/<script.*?>.*?<\/script>/gi, '')
  .trim();

const sanitizePayload = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizePayload);
  }

  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      value[key] = sanitizePayload(value[key]);
    }

    return value;
  }

  return typeof value === 'string' ? sanitizeString(value) : value;
};

const sanitizeRequest = (request, _, next) => {
  if (request.body) {
    sanitizePayload(request.body);
  }

  if (request.params) {
    sanitizePayload(request.params);
  }

  if (request.query) {
    sanitizePayload(request.query);
  }

  next();
};

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(sanitizeRequest);
app.use(morgan('dev'));

app.get('/', (_, response) => {
  response.json({ message: 'SY Digital Studio is live' });
});

app.get('/health', (_, response) => {
  response.json({ message: 'SY Digital Studio is live' });
});

app.get('/api/health', (_, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/site', siteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;