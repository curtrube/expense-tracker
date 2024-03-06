import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import { logger } from './middleware/logEvents.js';

const app = express();
const port = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

var whitelist = ['http://127.0.0.1', 'http://localhost'];
var corsOptions = {
  origin: function (origin, callback) {
    // TODO: before moving to production update whitelist and remove || !origin
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static('public'));

app.use(routes.categories);
app.use(routes.accounts);
app.use(routes.transactions);
app.use(routes.notFound);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
