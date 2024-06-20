import express from 'express';
import cors from 'cors';
import { corsOptions } from './configs/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import { createUser } from './controllers/userController.js';
import multer from 'multer';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// api routes
app.use('/api', routes);

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { mkdir } from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const uploadDir = path.join(__dirname, 'public', 'files');

// try {
//   if (!fs.existsSync(uploadDir)) {
//     await mkdir(uploadDir);
//   }
// } catch (err) {
//   console.error('Error creating uploadDir:', err);
// }

// Set up multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
//   },
// });

// const upload = multer({ storage: storage });

// // Define the upload route
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded.' });
//   }
//   const filePath = req.file.path;
//   const fileName = req.file.filename;

//   res.status(201).json({
//     message: 'File uploaded successfully',
//     filePath: filePath,
//     fileName: fileName,
//   });

//   processFile(`${filePath}`);
// });

// function processFile(filename) {
//   try {
//     const data = fs.readFileSync(filename, 'utf-8');
//     console.log(data);
//   } catch (err) {
//     console.error(`Error reading file: ${filename}`);
//   }
// }

// TODO: check if admin user exists
// const req = { body: { username: 'admin', password: 'supersecret' } };
// const res = {
//   status: (statusCode) => ({
//     json: (data) => {
//       console.log(`Status: ${statusCode}, Data:`, data);
//     },
//   }),
// };
// await createUser(req, res);

// Middleware to handle not found routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found in expense-tracker' });
  next();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
