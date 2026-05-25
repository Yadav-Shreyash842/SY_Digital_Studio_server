import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientName: String,
    clientCompany: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    overview: String,
    industry: String,
    duration: String,
    budget: { type: String, default: '0' },
    status: { type: String, enum: ['submitted', 'in review', 'in progress', 'delivered', 'completed'], default: 'submitted' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    progress: { type: Number, default: 0 },
    technologies: [String],
    images: [String],
    files: [{ name: String, url: String, uploadedAt: { type: Date, default: Date.now } }],
    results: String,
    testimonial: String,
    demoUrl: String,
    notes: [
      {
        message: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);