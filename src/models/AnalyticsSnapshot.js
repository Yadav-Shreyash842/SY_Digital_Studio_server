import mongoose from 'mongoose';

const analyticsSnapshotSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    note: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('AnalyticsSnapshot', analyticsSnapshotSchema);
