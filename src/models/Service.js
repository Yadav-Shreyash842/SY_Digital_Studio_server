import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    description: { type: String, required: true },
    overview: String,
    price: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    image: String,
    technologies: [String],
    features: [String],
    process: [String],
    benefits: String,
    featured: { type: Boolean, default: false },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);