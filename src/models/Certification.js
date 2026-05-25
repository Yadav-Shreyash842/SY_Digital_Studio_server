import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

export default mongoose.model('Certification', certificationSchema);
