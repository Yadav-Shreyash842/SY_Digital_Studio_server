import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['contact', 'client', 'hire'], default: 'contact' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String,
    company: String,
    phone: String,
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    serviceInterest: String,
    subject: String,
    body: { type: String, required: true },
    status: { type: String, enum: ['new', 'open', 'replied', 'closed'], default: 'new' },
    read: { type: Boolean, default: false },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);