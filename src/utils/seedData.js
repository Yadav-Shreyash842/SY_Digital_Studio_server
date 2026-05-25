import User from '../models/User.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import TeamMember from '../models/TeamMember.js';
import Testimonial from '../models/Testimonial.js';
import GalleryImage from '../models/GalleryImage.js';
import BlogPost from '../models/BlogPost.js';
import RecruiterProfile from '../models/RecruiterProfile.js';
import Certification from '../models/Certification.js';
import AnalyticsSnapshot from '../models/AnalyticsSnapshot.js';

export const seedServices = [
  {
    name: 'MERN Stack Development',
    slug: 'mern-stack-development',
    description: 'Production-grade business platforms with auth, dashboards, and scalable APIs.',
    price: '$4,500+',
    deliveryTime: '3-6 weeks',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    features: ['JWT auth', 'Role-based dashboards', 'REST APIs', 'Secure cookies'],
    process: ['Discovery', 'Architecture', 'Build', 'Launch'],
    benefits: 'Built for real client operations, not demo-only pages.',
    featured: true,
    category: 'Development',
  },
  {
    name: 'React Development',
    slug: 'react-development',
    description: 'Fast, motion-rich frontends with reusable components and crisp responsive layouts.',
    price: '$2,200+',
    deliveryTime: '2-4 weeks',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    features: ['Motion systems', 'Reusable UI', 'Responsive design', 'Performance tuning'],
    process: ['Wireframe', 'Design', 'Build', 'Optimize'],
    benefits: 'Premium frontend experiences that feel instantly modern.',
    category: 'Frontend',
  },
  {
    name: 'AI Dashboard Development',
    slug: 'ai-dashboard-development',
    description: 'Dashboards and internal tools for AI-enabled teams and modern operations.',
    price: '$5,500+',
    deliveryTime: '4-8 weeks',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Analytics', 'Automation', 'AI workflows'],
    features: ['Prompt panels', 'Usage metrics', 'Workflow automations', 'Role permissions'],
    process: ['Data model', 'UX', 'Build', 'QA'],
    benefits: 'Clear internal tooling for teams shipping AI products.',
    featured: true,
    category: 'Product',
  },
];

export const seedTeamMembers = [
  { name: 'Aarav Mehta', role: 'Lead MERN Developer', expertise: 'Auth architecture, scalable APIs, product engineering', experience: '8+ years', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80', socialLinks: [] },
  { name: 'Nina Kapoor', role: 'Frontend Developer', expertise: 'React systems, motion design, responsive UI', experience: '6+ years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80', socialLinks: [] },
  { name: 'Ishaan Roy', role: 'UI/UX Designer', expertise: 'Research, wireframes, SaaS interfaces, prototyping', experience: '7+ years', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80', socialLinks: [] },
];

export const seedTestimonials = [
  { name: 'Mason Lee', company: 'Aurora Labs', quote: 'They delivered a premium digital presence that made our agency feel instantly credible.', projectType: 'Website + client portal', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', rating: 5 },
  { name: 'Priya Desai', company: 'Northstar Finance', quote: 'The strategy, motion, and dashboard experience all felt like a premium startup launch package.', projectType: 'Fintech launch', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', rating: 5 },
];

export const seedGalleryImages = [
  { title: 'Studio Concept', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80', category: 'Design', description: 'Creative direction and interface exploration.' },
  { title: 'Launch Build', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', category: 'Development', description: 'Product build and dashboard delivery.' },
  { title: 'Motion System', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80', category: 'Motion', description: 'Animated presentation and cinematic layout work.' },
];

export const seedBlogPosts = [
  { title: 'How premium agency websites convert better than generic templates', category: 'Strategy', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80', excerpt: 'Why visual confidence and clear conversion flow matter.' },
  { title: 'Why modern startups need client portals, not just landing pages', category: 'Product', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80', excerpt: 'How operational UX raises trust and retention.' },
];

export const seedRecruiterProfile = {
  title: 'Recruiter-friendly profile',
  summary: 'A concise view of experience, stack depth, certifications, and shipping discipline for clients and hiring teams.',
  resumeLabel: 'Download Resume',
  resumeHref: '/resume.pdf',
  techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'REST APIs', 'JWT'],
  certifications: ['MongoDB fundamentals', 'React UI systems', 'Brand strategy', 'Motion design'],
  achievements: [
    'Built full-stack agency systems with auth, dashboards, and CRM-style workflows.',
    'Improved conversion-focused layouts with premium visual direction and motion.',
    'Shipped client-ready experiences optimized for mobile, recruiters, and sales teams.',
  ],
  experienceTimeline: [
    { label: '2022 - Present', title: 'Lead MERN Developer', copy: 'Build agency platforms, dashboards, and secure client portals.' },
    { label: '2021 - 2022', title: 'Frontend Specialist', copy: 'Delivered responsive React systems and motion-led user interfaces.' },
    { label: '2020 - 2021', title: 'Creative Technologist', copy: 'Worked across branding, editing, and product storytelling.' },
  ],
};

export const seedCertifications = [
  { name: 'MongoDB fundamentals', issuer: 'MongoDB University', year: '2024', category: 'Database' },
  { name: 'React UI systems', issuer: 'Frontend Masters', year: '2024', category: 'Frontend' },
  { name: 'Motion design workflow', issuer: 'Framer Motion', year: '2023', category: 'Design' },
];

export const seedAnalyticsSnapshots = [
  { label: 'Lead conversion', value: '38%', note: 'Improvement across premium agency landing pages.' },
  { label: 'Mobile UX score', value: '96', note: 'Optimized for fast, high-trust mobile browsing.' },
  { label: 'Trust indicators', value: '24/7', note: 'Always-visible support and contact actions.' },
];

export const seedProjectTemplates = [
  {
    title: 'SY Digital Studio Cloud',
    description: 'A cinematic client platform for managing creative retainers, approvals, and payments.',
    overview: 'A premium client workspace for creative operations.',
    industry: 'Creative SaaS',
    duration: '10 weeks',
    budget: '$12,000',
    status: 'in progress',
    priority: 'high',
    progress: 72,
    technologies: ['React', 'Node.js', 'MongoDB'],
    images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80'],
    results: '38% faster onboarding and more qualified leads.',
    testimonial: 'It looks and feels like a funded product.',
    demoUrl: '#contact',
  },
];

export const seedAdminUser = {
  name: 'Shreyash Yadav',
  email: 'yadavshreyash842@gmail.com',
  password: 'Shreyash@9080',
  role: 'admin',
  isVerified: true,
  company: 'SY Digital Studio',
};

export const ensureSeedData = async () => {
  const existingAdmin = await User.findOne({ email: seedAdminUser.email });

  if (existingAdmin) {
    existingAdmin.name = seedAdminUser.name;
    existingAdmin.password = seedAdminUser.password;
    existingAdmin.role = seedAdminUser.role;
    existingAdmin.isVerified = seedAdminUser.isVerified;
    existingAdmin.company = seedAdminUser.company;
    await existingAdmin.save();
  } else {
    await User.create(seedAdminUser);
  }

  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany(seedServices);
  }

  if ((await Project.countDocuments()) === 0) {
    const [template] = seedProjectTemplates;
    await Project.create({
      client: undefined,
      clientName: 'Demo Client',
      clientCompany: 'SY Digital Studio',
      ...template,
    }).catch(() => null);
  }

  if ((await TeamMember.countDocuments()) === 0) {
    await TeamMember.insertMany(seedTeamMembers);
  }

  if ((await Testimonial.countDocuments()) === 0) {
    await Testimonial.insertMany(seedTestimonials);
  }

  if ((await GalleryImage.countDocuments()) === 0) {
    await GalleryImage.insertMany(seedGalleryImages);
  }

  if ((await BlogPost.countDocuments()) === 0) {
    await BlogPost.insertMany(seedBlogPosts);
  }

  if ((await RecruiterProfile.countDocuments()) === 0) {
    await RecruiterProfile.create(seedRecruiterProfile);
  }

  if ((await Certification.countDocuments()) === 0) {
    await Certification.insertMany(seedCertifications);
  }

  if ((await AnalyticsSnapshot.countDocuments()) === 0) {
    await AnalyticsSnapshot.insertMany(seedAnalyticsSnapshots);
  }
};

