import Message from '../models/Message.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';

export const getClientDashboard = async (request, response) => {
  const [services, projects, messages] = await Promise.all([
    Service.find().sort('-createdAt').limit(12),
    Project.find({ client: request.user._id }).sort('-createdAt'),
    Message.find({ sender: request.user._id }).sort('-createdAt'),
  ]);

  response.json({
    stats: { projects: projects.length, messages: messages.length, services: services.length },
    projects,
    messages,
    services,
  });
};

export const updateClientProfile = async (request, response) => {
  request.user.name = request.body.name || request.user.name;
  request.user.email = request.body.email || request.user.email;
  request.user.company = request.body.company || request.user.company;
  request.user.phone = request.body.phone || request.user.phone;
  await request.user.save();

  response.json({
    user: {
      id: request.user._id,
      name: request.user.name,
      email: request.user.email,
      role: request.user.role,
      isVerified: request.user.isVerified,
      company: request.user.company,
      phone: request.user.phone,
    },
  });
};

export const createMessage = async (request, response) => {
  const message = await Message.create({ kind: 'client', sender: request.user._id, ...request.body });
  response.status(201).json({ message });
};

export const hireService = async (request, response) => {
  const service = await Service.findById(request.body.serviceId);

  if (!service) {
    return response.status(404).json({ message: 'Service not found' });
  }

  const project = await Project.create({
    client: request.user._id,
    clientName: request.user.name,
    clientCompany: request.user.company,
    title: service.name,
    description: request.body.notes || service.description,
    overview: service.description,
    industry: service.category,
    duration: service.deliveryTime,
    budget: service.price,
    technologies: service.technologies,
    images: service.image ? [service.image] : [],
    status: 'submitted',
    priority: 'medium',
    progress: 0,
  });

  await Message.create({
    kind: 'hire',
    sender: request.user._id,
    service: service._id,
    subject: `Hire request: ${service.name}`,
    body: request.body.notes || `Client wants to hire ${service.name}`,
    serviceInterest: service.name,
  });

  response.status(201).json({ message: 'Service requested successfully', project });
};