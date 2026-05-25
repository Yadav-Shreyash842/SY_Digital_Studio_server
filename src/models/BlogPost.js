import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    readTime: { type: String, required: true },
    image: { type: String, required: true },
    excerpt: String,
    slug: String,
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('BlogPost', blogPostSchema);