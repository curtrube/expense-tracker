import fs from 'fs';
import { appendFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const logEvents = async (message, logName) => {
  const dateTime = new Date().toISOString();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const logsDir = path.join(__dirname, '../../', 'logs');
  const logItem = `${dateTime} ${message}\n`;
  try {
    if (!fs.existsSync(logsDir)) {
      await mkdir(logsDir);
    }
    await appendFile(path.join(logsDir, logName), logItem);
  } catch (err) {
    console.error(err);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requests.log');
  console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
  next();
};
