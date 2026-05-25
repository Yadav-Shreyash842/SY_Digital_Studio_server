import mongoose from 'mongoose';

const recruiterProfileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    resumeLabel: { type: String, default: 'Download Resume' },
    resumeHref: { type: String, default: '/resume.pdf' },
    techStack: [String],
    certifications: [String],
    achievements: [String],
    experienceTimeline: [
      {
        label: String,
        title: String,
        copy: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('RecruiterProfile', recruiterProfileSchema);
