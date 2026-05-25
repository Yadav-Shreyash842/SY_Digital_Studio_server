import User from '../models/User.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Message from '../models/Message.js';
import TeamMember from '../models/TeamMember.js';
import Testimonial from '../models/Testimonial.js';
import GalleryImage from '../models/GalleryImage.js';
import BlogPost from '../models/BlogPost.js';
import { seedAdminUser, seedBlogPosts, seedGalleryImages, seedServices, seedTeamMembers, seedTestimonials } from '../utils/seedData.js';

const maybeSeedAdmin = async () => {
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
};

export const getAdminDashboard = async (_, response) => {
  await maybeSeedAdmin().catch(() => null);

  const [clients, projects, services] = await Promise.all([
    User.find({ role: 'client' }).sort('-createdAt'),
    Project.find().populate('client', 'name email').sort('-createdAt'),
    Service.find().sort('-createdAt'),
  ]);

  const [team, testimonials, gallery, blogs, contacts] = await Promise.all([
    TeamMember.find().sort('-createdAt'),
    Testimonial.find().sort('-createdAt'),
    GalleryImage.find().sort('-createdAt'),
    BlogPost.find().sort('-createdAt'),
    Message.find({ kind: 'contact' }).sort('-createdAt'),
  ]);

  response.json({
    stats: {
      clients: clients.length,
      projects: projects.length,
      services: services.length,
      revenue: projects.reduce((sum, project) => sum + Number(String(project.budget || 0).replace(/[^0-9.]/g, '') || 0), 0),
    },
    clients,
    projects,
    services,
    team,
    testimonials,
    gallery,
    blogs,
    contacts,
  });
};

export const getClients = async (_, response) => {
  const clients = await User.find({ role: 'client' }).sort('-createdAt');
  response.json({ clients });
};

export const getProjects = async (_, response) => {
  const projects = await Project.find().populate('client', 'name email').sort('-createdAt');
  response.json({ projects });
};

export const getUsers = async (_, response) => {
  const users = await User.find().sort('-createdAt');
  response.json({ users });
};

export const createTeamMember = async (request, response) => {
  const teamMember = await TeamMember.create(request.body);
  response.status(201).json({ teamMember });
};

export const updateTeamMember = async (request, response) => {
  const teamMember = await TeamMember.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json({ teamMember });
};

export const deleteTeamMember = async (request, response) => {
  await TeamMember.findByIdAndDelete(request.params.id);
  response.json({ message: 'Team member deleted' });
};

export const createTestimonial = async (request, response) => {
  const testimonial = await Testimonial.create(request.body);
  response.status(201).json({ testimonial });
};

export const updateTestimonial = async (request, response) => {
  const testimonial = await Testimonial.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json({ testimonial });
};

export const deleteTestimonial = async (request, response) => {
  await Testimonial.findByIdAndDelete(request.params.id);
  response.json({ message: 'Testimonial deleted' });
};

export const createGalleryImage = async (request, response) => {
  const galleryImage = await GalleryImage.create(request.body);
  response.status(201).json({ galleryImage });
};

export const updateGalleryImage = async (request, response) => {
  const galleryImage = await GalleryImage.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json({ galleryImage });
};

export const deleteGalleryImage = async (request, response) => {
  await GalleryImage.findByIdAndDelete(request.params.id);
  response.json({ message: 'Gallery image deleted' });
};

export const createBlogPost = async (request, response) => {
  const blogPost = await BlogPost.create(request.body);
  response.status(201).json({ blogPost });
};

export const updateBlogPost = async (request, response) => {
  const blogPost = await BlogPost.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json({ blogPost });
};

export const deleteBlogPost = async (request, response) => {
  await BlogPost.findByIdAndDelete(request.params.id);
  response.json({ message: 'Blog post deleted' });
};

export const getContacts = async (_, response) => {
  const contacts = await Message.find({ kind: { $in: ['contact', 'client', 'hire'] } }).sort('-createdAt');
  response.json({ contacts });
};