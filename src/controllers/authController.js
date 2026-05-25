import User from '../models/User.js';
import { createRandomToken, createToken } from '../utils/tokens.js';
import { sendEmail } from '../utils/email.js';

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const setAuthCookie = (response, token) => {
  response.cookie('token', token, authCookieOptions);
};

export const signup = async (request, response) => {
  const { name, email, password } = request.body;
  const existing = await User.findOne({ email });

  if (existing) {
    return response.status(400).json({ message: 'Email already exists' });
  }

  const verificationToken = createRandomToken();
  const user = await User.create({ name, email, password, emailVerificationToken: verificationToken, role: 'client' });

  await sendEmail({
    to: user.email,
    subject: 'Verify your SY Digital Studio account',
    text: `Use this verification token to activate your account: ${verificationToken}`,
  });

  response.status(201).json({ message: 'Account created. Check email for verification.' });
};

export const verifyEmail = async (request, response) => {
  const { token } = request.body;
  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    return response.status(400).json({ message: 'Invalid token' });
  }

  user.isVerified = true;
  user.emailVerifiedAt = new Date();
  user.emailVerificationToken = undefined;
  await user.save();

  response.json({ message: 'Email verified successfully' });
};

export const login = async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    return response.status(401).json({ message: 'Invalid credentials' });
  }

  const token = createToken(user._id);
  setAuthCookie(response, token);

  response.json({
    message: 'Login successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      company: user.company,
      phone: user.phone,
    },
  });
};

export const logout = async (_, response) => {
  response.clearCookie('token', authCookieOptions);
  response.json({ message: 'Logged out' });
};

export const me = async (request, response) => {
  response.json({
    user: request.user
      ? {
          id: request.user._id,
          name: request.user.name,
          email: request.user.email,
          role: request.user.role,
          isVerified: request.user.isVerified,
            company: request.user.company,
            phone: request.user.phone,
        }
      : null,
  });
};

export const forgotPassword = async (request, response) => {
  const { email } = request.body;
  const user = await User.findOne({ email });

  if (!user) {
    return response.json({ message: 'If the account exists, a reset email was sent.' });
  }

  const resetToken = createRandomToken();
  user.passwordResetToken = resetToken;
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
  await user.save();

  await sendEmail({
    to: user.email,
    subject: 'Reset your SY Digital Studio password',
    text: `Use this reset token: ${resetToken}`,
  });

  response.json({ message: 'If the account exists, a reset email was sent.' });
};

export const resetPassword = async (request, response) => {
  const { token, password } = request.body;
  const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });

  if (!user) {
    return response.status(400).json({ message: 'Invalid or expired token' });
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  response.json({ message: 'Password updated' });
};