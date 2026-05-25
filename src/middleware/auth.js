import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (request, response, next) => {
  const token = request.cookies.token || request.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return response.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = await User.findById(decoded.id).select('-password');

    if (!request.user) {
      return response.status(401).json({ message: 'User not found' });
    }

    next();
  } catch {
    return response.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles) => (request, response, next) => {
  if (!roles.includes(request.user.role)) {
    return response.status(403).json({ message: 'Forbidden' });
  }

  next();
};