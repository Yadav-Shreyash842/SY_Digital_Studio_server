import fs from 'fs';
import path from 'path';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import { seedProjectTemplates } from '../utils/seedData.js';

const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const ensureProjects = async () => {
  if ((await Project.countDocuments()) === 0 && seedProjectTemplates.length > 0) {
    const [template] = seedProjectTemplates;
    await Project.create({
      client: template.client,
      clientName: template.clientName || 'Demo Client',
      clientCompany: template.clientCompany || 'SY Digital Studio',
      title: template.title,
      description: template.description,
      overview: template.overview,
      industry: template.industry,
      duration: template.duration,
      budget: template.budget,
      status: template.status,
      priority: template.priority,
      progress: template.progress,
      technologies: template.technologies,
      images: template.images,
      results: template.results,
      testimonial: template.testimonial,
      demoUrl: template.demoUrl,
    });
  }
};

export const listClientProjects = async (request, response) => {
  await ensureProjects().catch(() => null);
  const filter = request.user.role === 'admin' ? {} : { client: request.user._id };
  const projects = await Project.find(filter).populate('client', 'name email role').sort('-createdAt');
  response.json({ projects });
};

export const createProject = async (request, response) => {
  const service = request.body.serviceId ? await Service.findById(request.body.serviceId) : null;
  const project = await Project.create({
    client: request.user._id,
    clientName: request.user.name,
    clientCompany: request.user.company,
    title: request.body.title || service?.name || 'New project request',
    description: request.body.description || request.body.notes || service?.description || 'Project request submitted through the client dashboard.',
    overview: request.body.overview || request.body.description,
    industry: request.body.industry || service?.category,
    duration: request.body.duration || service?.deliveryTime || 'TBD',
    budget: request.body.budget || service?.price || '0',
    technologies: service?.technologies || [],
    images: service?.image ? [service.image] : [],
    status: 'submitted',
    priority: 'medium',
    progress: 0,
  });
  response.status(201).json({ project });
};

export const uploadProjectFile = async (request, response) => {
  if (!request.file) {
    return response.status(400).json({ message: 'File required' });
  }

  const project = await Project.findByIdAndUpdate(
    request.params.id,
    { $push: { files: { name: request.file.originalname, url: `/uploads/${request.file.filename}` } } },
    { new: true }
  );

  response.json({ project });
};

export const updateProject = async (request, response) => {
  const project = await Project.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json({ project });
};