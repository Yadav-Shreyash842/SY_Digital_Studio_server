import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model('GalleryImage', galleryImageSchema);