'use strict';

import { Router } from 'express';

const notFound = Router();

notFound.get('*', function (req, res) {
  res.status(404).send('page not found');
});

export default notFound;
