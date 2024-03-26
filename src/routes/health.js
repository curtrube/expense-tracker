import { Router } from 'express';

const router = Router();

router.get('/health', async (req, res) => {
  const date = new Date();
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: date.toISOString(),
  };
  try {
    res.send(healthCheck);
  } catch (err) {
    healthCheck.message = err;
    res.status(503);
  }
});

export default router;
