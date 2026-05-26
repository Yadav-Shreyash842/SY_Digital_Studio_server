import mongoose from 'mongoose';

const slugify = (value) => String(value || '')
  .toLowerCase()
  .trim()
  .replace(/['"]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    thumbnail: { type: String, required: true },
    readingTime: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    publishDate: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    excerpt: { type: String, trim: true },
    quote: { type: String, trim: true },
    image: { type: String, trim: true },
    readTime: { type: String, trim: true },
  },
  { timestamps: true }
);

blogPostSchema.pre('validate', function setBlogSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }

  if (!this.image && this.thumbnail) {
    this.image = this.thumbnail;
  }

  if (!this.readTime && this.readingTime) {
    this.readTime = this.readingTime;
  }

  next();
});

export default mongoose.model('BlogPost', blogPostSchema);