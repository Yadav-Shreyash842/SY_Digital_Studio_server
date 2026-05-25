import BlogPost from '../models/BlogPost.js';
import RecruiterProfile from '../models/RecruiterProfile.js';
import Certification from '../models/Certification.js';
import AnalyticsSnapshot from '../models/AnalyticsSnapshot.js';
import GalleryImage from '../models/GalleryImage.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import TeamMember from '../models/TeamMember.js';
import Testimonial from '../models/Testimonial.js';
import {
  seedBlogPosts,
  seedGalleryImages,
  seedProjectTemplates,
  seedServices,
  seedTeamMembers,
  seedTestimonials,
  ensureSeedData,
} from '../utils/seedData.js';

const listOrSeed = async (model, seed) => {
  try {
    const items = await model.find().sort({ createdAt: -1 });
    return items.length ? items : seed;
  } catch {
    return seed;
  }
};

export const getSiteContent = async (_, response) => {
  try {
    await ensureSeedData();
  } catch {
    // Ignore seed failures when Mongo is unavailable; the frontend has a local fallback.
  }

  const [services, team, testimonials, gallery, blogs, projects, recruiterProfile, certifications, analytics] = await Promise.all([
    listOrSeed(Service, seedServices),
    listOrSeed(TeamMember, seedTeamMembers),
    listOrSeed(Testimonial, seedTestimonials),
    listOrSeed(GalleryImage, seedGalleryImages),
    listOrSeed(BlogPost, seedBlogPosts),
    listOrSeed(Project, seedProjectTemplates),
    RecruiterProfile.findOne().catch(() => null),
    Certification.find().sort({ createdAt: -1 }).catch(() => []),
    AnalyticsSnapshot.find().sort({ createdAt: -1 }).catch(() => []),
  ]);

  response.json({
    hero: {
      label: 'Premium Creative Technology Agency',
      title: 'We build premium digital experiences for companies that need trust, conversion, and scale.',
      copy: 'MERN platforms, creative UI systems, branding, video, and AI-enabled dashboards designed to feel like a high-end startup from first glance.',
    },
    services,
    team,
    testimonials,
    gallery,
    blogs,
    projects,
    recruiterProfile,
    certifications,
    analytics,
  });
};