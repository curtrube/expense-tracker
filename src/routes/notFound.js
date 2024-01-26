'use strict';

import { Router } from 'express';

console.log('inside routes/notFound.js');

const notFound = Router();

notFound.get('*', function (req, res) {
  res.status(404).send('page not found');
});

export default notFound;
