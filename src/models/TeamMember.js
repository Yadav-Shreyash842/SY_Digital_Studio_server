import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    expertise: { type: String, required: true },
    experience: { type: String, required: true },
    image: String,
    socialLinks: [{ label: String, href: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('TeamMember', teamMemberSchema);