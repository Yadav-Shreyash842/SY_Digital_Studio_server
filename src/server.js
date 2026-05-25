import app from './app.js';
import connectDatabase from './config/db.js';
import { ensureSeedData } from './utils/seedData.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();
  await ensureSeedData().catch(() => null);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();