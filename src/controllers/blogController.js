import BlogPost from '../models/BlogPost.js';
import { ensureSeedData, seedBlogPosts } from '../utils/seedData.js';

const getPublishedBlogQuery = () => ({ published: { $ne: false } });

const escapeRegex = (value) => String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const matchesCategory = (blog, category) => String(blog.category || '').toLowerCase() === String(category || '').toLowerCase();

const normalizeSlug = (blog) => String(blog.slug || '').toLowerCase();

const mergeBlogs = (liveBlogs = [], seedBlogs = []) => {
  const merged = [];
  const seen = new Set();

  for (const blog of [...liveBlogs, ...seedBlogs]) {
    const key = normalizeSlug(blog) || String(blog.title || '').toLowerCase();

    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    merged.push(blog);
  }

  return merged;
};

export const listBlogs = async (request, response) => {
  await ensureSeedData().catch(() => null);

  const category = request.query.category ? String(request.query.category).toLowerCase() : '';
  const query = category ? { ...getPublishedBlogQuery(), category: new RegExp(`^${escapeRegex(category)}$`, 'i') } : getPublishedBlogQuery();

  const blogs = await BlogPost.find(query).sort({ publishDate: -1, createdAt: -1 });
  const fallback = category ? seedBlogPosts.filter((blog) => matchesCategory(blog, category)) : seedBlogPosts;
  response.json({ blogs: mergeBlogs(blogs, fallback) });
};

export const getBlogBySlug = async (request, response) => {
  await ensureSeedData().catch(() => null);

  const category = request.query.category ? String(request.query.category).toLowerCase() : '';
  const query = { slug: request.params.slug, ...getPublishedBlogQuery() };

  if (category) {
    query.category = new RegExp(`^${escapeRegex(category)}$`, 'i');
  }

  const blog = await BlogPost.findOne(query);

  if (!blog) {
    const seedMatch = seedBlogPosts.find((item) => item.slug === request.params.slug && (!category || matchesCategory(item, category)));

    if (seedMatch) {
      return response.json({ blog: seedMatch });
    }

    return response.status(404).json({ message: 'Blog post not found' });
  }

  response.json({ blog });
};