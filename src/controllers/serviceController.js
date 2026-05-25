import Service from '../models/Service.js';
import { seedServices } from '../utils/seedData.js';

const ensureServices = async () => {
  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany(seedServices);
  }
};

export const getServices = async (_, response) => {
  await ensureServices().catch(() => null);
  const services = await Service.find().sort({ featured: -1, createdAt: -1 });
  response.json({ services });
};

export const createService = async (request, response) => {
  const service = await Service.create({
    ...request.body,
    slug: (request.body.slug || request.body.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  });
  response.status(201).json({ service });
};

export const updateService = async (request, response) => {
  const service = await Service.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json({ service });
};

export const deleteService = async (request, response) => {
  await Service.findByIdAndDelete(request.params.id);
  response.json({ message: 'Service deleted' });
};