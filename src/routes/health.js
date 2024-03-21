import { Router } from 'express';

const router = Router();

router.get('/alive', (req, res) => {
  res.status(200).send('alive');
});

export default router;
