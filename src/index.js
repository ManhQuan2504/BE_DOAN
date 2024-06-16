import Express from "express";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { initConnectToDB } from './core/startup/startupDB.js'
import { initCreateRouter } from './core/startup/startupRouter.js' // Sửa tên hàm này thành initCreateRouter

const app = Express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PORT = process.env.PORT || 3001;
const db = process.env.MONGO_URL;

(async () => {
  try {
    await initConnectToDB();
    await initCreateRouter(app);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
})();
