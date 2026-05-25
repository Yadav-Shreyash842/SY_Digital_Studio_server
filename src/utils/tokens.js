import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const createRandomToken = () => crypto.randomBytes(32).toString('hex');